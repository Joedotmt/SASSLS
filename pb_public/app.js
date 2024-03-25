const pb = new PocketBase('http://127.0.0.1:8090');

localStorage.setItem("theme_settings", "blue green red");
console.log(localStorage.getItem("theme_settings"))

let books_color = "blue"
let borrowers_color = "green"
let transactions_color = "red"
var all_book_records;
if (window.location.hash == "")
{
    window.location.hash = "books"
    console.log(window.location.hash)
}
let current_page;

collection_change()

window.addEventListener(
    "hashchange",
    () =>
    {
        collection_change()
    },
    false,
);

function collection_change()
{
    collection_select.value = window.location.hash.substring(1)
    current_page = window.location.hash.substring(1)

    list_selected_collection()

    search_filter_input.placeholder = `Search ${current_page.charAt(0).toUpperCase() + current_page.slice(1)}`


    let str = document.body.className
    light_or_dark = "_" + str.substring(str.indexOf("_") + 1)

    switch (current_page)
    {
        case "books":
            color = books_color;
            break;
        case "borrowers":
            color = borrowers_color;
            break;
        case "transactions":
            color = transactions_color;
            break;
        case "prints":
            color = transactions_color;
        default:
            color = books_color
    }
    document.body.className = color + light_or_dark
    list_selected_collection()
}

function list_selected_collection()
{
    switch (current_page)
    {
        case "books":
            list_books();
            break;
        case "borrowers":
            list_borrowers();
            break;
        case "transactions":
            //color = transactions_color;
            break;
        case "prints":
            list_prints();
    }
}


function change_dark_light_theme()
{
    let new_string = document.body.className.replace("light", "dark")
    dark_mode_switcher_icon.innerHTML = "light_mode"
    if (new_string == document.body.className)
    {
        new_string = document.body.className.replace("dark", "light")
        dark_mode_switcher_icon.innerHTML = "dark_mode"
    }
    document.body.className = new_string;
}

function logo_easter_egg()
{
    logo_text.style.fontWeight = parseInt(logo_text.style.fontWeight) + 50
    if (logo_text.style.fontWeight > 900)
    {
        logo_text.innerHTML = `Made by <a target="_blank" rel="external" href="https://permanentlink.github.io/#saslib">Joe Gringinu Esposito</a>`
    }
}

function createRipple(event)
{
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    let button_rect = button.getBoundingClientRect()
    circle.classList.add("ripple");
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button_rect.x - radius}px`//`${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button_rect.y - radius}px`//`${event.clientY - button.offsetTop - radius}px`;
    setTimeout(function ()
    {
        circle.remove();
    }, 1000);
    button.appendChild(circle);
}

function copy_isbn()
{
    copy_isbn_tooltip.innerHTML = `Copied!`
    setInterval(function () {copy_isbn_tooltip.innerHTML = `Copy`},5000)
    var copyText = document.getElementById("display_panel_book_isbn").innerHTML;
    navigator.clipboard.writeText(copyText)
}
function copy_borrower_id_from_books()
{
    copy_borrower_book_tooltip.innerHTML = `Copied!`
    setInterval(function () {copy_borrower_book_tooltip.innerHTML = `Copy`},5000)
    var copyText = document.getElementById("id_to_be_copied_from_books").innerHTML;
    navigator.clipboard.writeText(copyText)
}

function open_account_dialog()
{
    account_dialog.showModal()
    account_dialog.addEventListener('click', ((event) =>
    {
        let rect = event.target.getBoundingClientRect();
        if
            (
            rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        )
        {
            account_dialog.close();
        }
    })
    );
}

const all_buttons = document.getElementsByTagName("button");
for (const button of all_buttons)
{
    button.addEventListener("mousedown", createRipple);
}

function generate_unique_book_id(record_id, text)
{
    try
    {
        let randInt = Math.floor(Math.random() * 1679615) * 4
        let generated_id = text.substring(randInt, randInt + 4)
        const data_new = { "book_id": generated_id };
        pb.collection('books').update(record_id, data_new);
    } catch (err)
    {
        if (err.data.data.book_id.code == "validation_not_unique")
        {
            generate_unique_book_id(record_id, text);
        }
    }
}
async function list_books()
{
    let enteredVal = search_filter_input.value;
    let enteredTokens = enteredVal.split(" ");
    console.log(enteredTokens);
    let pbFilter = "";
    let operand = "";
    for (const enteredToken of enteredTokens)
    {
        let cleanToken = enteredToken.trim();
        if (cleanToken !== "")
        {
            pbFilter += `${operand} (legacy_book_id = "${cleanToken}" || book_id = "${cleanToken}" || title  ~ "%${cleanToken}%" || isbn = "${cleanToken}")`;
            operand = " && ";
        }
    }
    console.log(pbFilter);

    // you can also fetch all records at once via getFullList
    all_book_records = await pb.collection('books').getFullList(
        {
            sort: '-created',
            filter: pbFilter
        });
    list_area_list.innerHTML = ""
    let create_template_list_item = document.createElement("button");
    create_template_list_item.innerHTML = `+ Create Book`;
    create_template_list_item.className = "list_button list_item";
    create_template_list_item.style.borderBottom = `2px dashed var(--color-neutral-variant60)`
    create_template_list_item.addEventListener("mousedown", createRipple);
    list_area_list.appendChild(create_template_list_item)
    for (const rec of all_book_records)
    {

        // If record has no ID assign it one
        if (rec.book_id == "")
        {
            fetch("book_id_list_length_4.txt")
                .then((res) => res.text())
                .then((text) =>
                {
                    generate_unique_book_id(rec.id, text)
                })
                .catch((e) => console.error(e));
            list_selected_collection()
            return
        }

        let list_item = document.createElement("button");
        list_item.className = "list_button list_item";
        list_item.dataset.id = rec.id;
        list_area_list.appendChild(list_item);
        list_item.addEventListener("mousedown", createRipple);
        list_item.onclick = clickHandler;

        let preview_image = document.createElement("img");
        preview_image.className = "preview_image";
        preview_image.setAttribute("src", `https://covers.openlibrary.org/b/isbn/${rec.isbn}-S.jpg`);
        let info_div = document.createElement("div");
        info_div.className = "list_item_info_text";
        info_div.innerHTML = `Title: ${rec.title} 
                                <label style="font-family:'Roboto Mono'">
                                    ${rec.legacy_book_id} ${rec.book_id}
                                </label>`;
        list_item.appendChild(preview_image);
        list_item.appendChild(info_div);
    }

}

function clickHandler(ev)
{
    let useid = ev.srcElement.dataset.id;
    let book = all_book_records.find((s) =>
    {
        return s.id === useid;
    })
    console.log(book)

/////////DISPLAY PANEL NONSENCE/////////////////////////////////////
    display_panel_book_system_id.innerHTML = "SYS_ID: "+book.id
    display_panel_book_book_id.innerHTML = "ID: "+book.book_id
    display_panel_book_legacy_book_id.innerHTML = "IDL: "+book.legacy_book_id
    display_panel_book_title.innerHTML = book.title
    display_panel_book_author.innerHTML = "by "+book.author
    display_panel_book_isbn.innerHTML = book.isbn
    display_panel_book_cover.src = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
    display_panel_book_description.innerHTML = book.description
    display_panel_book_classification_label.innerHTML = book.classification_label
    //display_panel_book_subject.innerHTML = book.subject
    //display_panel_book_level.innerHTML = book.level
    display_panel_book_lost.style.display = book.lost ? "block" : "none"
    display_panel_book_scrapped.style.display = book.lost ? "block" : "none"
    if (book.price > 0)
    {
        display_panel_book_price.style.display = "block"
        display_panel_book_price.innerHTML = "Price: "+book.price+" EUR"
    }
    
    if (book.legacy_date_entered == "")
    {
        display_panel_book_created.innerHTML = "Created: "+book.created
    }
    else
    {
        display_panel_book_created.innerHTML = "Legacy Created: "+book.legacy_date_entered
        display_panel_book_system_created.innerHTML = "SYS_CREATED: "+book.created
    }
    display_panel_book_updated.innerHTML = "Updated: "+book.updated
///////////////////////////////////////////////////////////



    let clickedOne = ev.srcElement;
    list_area_list.querySelectorAll(".list_item").forEach(function (i)
    {
        i.style.background = "";
        //i.style.borderRadius = "";
        //i.style.margin = "";
        //i.style.padding = "";
    })
    //clickedOne.style.cssText = "border-radius: 1.5em !important; background: var(--color-secondary-container); margin: 0.2em !important; padding: 0.8em !important";
    clickedOne.style.background = "var(--color-on-surface-2)";
}

function generate_unique_borrower_id(record_id, text)
{
    try
    {
        let randInt = Math.floor(Math.random() * 46655) * 3
        console.log(text)
        let generated_id = text.substring(randInt, randInt + 3)
        const data_new = { "borrower_id": generated_id };
        pb.collection('borrowers').update(record_id, data_new);
    } catch (err)
    {
        if (err.data.data.borrower_id.code == "validation_not_unique")
        {
            generate_unique_borrower_id(record_id, text);
        }
    }
}

async function list_borrowers()
{
    let enteredVal = search_filter_input.value;
    let enteredTokens = enteredVal.split(" ");
    console.log(enteredTokens);
    let pbFilter = "";
    let operand = "";
    for (const enteredToken of enteredTokens)
    {
        let cleanToken = enteredToken.trim();
        if (cleanToken !== "")
        {
            pbFilter += `${operand} (borrower_id = "${cleanToken}" || name ~ "%${cleanToken}%" || surname ~ "%${cleanToken}%" || group ~ "%${cleanToken}")`;
            operand = " && ";
        }
    }
    console.log(pbFilter);

    // you can also fetch all records at once via getFullList
    const records = await pb.collection('borrowers').getFullList(
        {
            sort: '-created',
            filter: pbFilter
        });
    list_area_list.innerHTML = ""
    let create_template_list_item = document.createElement("div");
    create_template_list_item.innerHTML = `+ Create Borrower`;
    create_template_list_item.className = "list_item";
    create_template_list_item.style.cssText = `border: 2px dashed var(--color-on-background);
    background-color: initial;
    border-radius: 1em;
    margin: 0.9em;
    margin-bottom: 0;`
    list_area_list.appendChild(create_template_list_item)
    console.log(records)
    for (const rec of records)
    {

        // If record has no ID assign it one
        if (rec.borrower_id == "")
        {
            fetch("borrowers_id_list_length_3.txt")
                .then((res) => res.text())
                .then((text) =>
                {
                    generate_unique_borrower_id(rec.id, text)
                })
                .catch((e) => console.error(e));
            list_borrowers()
            return
        }


        let list_item = document.createElement("div");
        list_item.innerHTML = `<img style="height: 2.8em; width: 1.8em; object-fit: cover;
            padding: 0em;
            pointer-events: none;
            margin: 0em;
            background-color: white;
            border: solid aliceblue 1px;
            border-radius: 2px;" src=https://covers.openlibrary.org/b/isbn/${"img"}-S.jpg> ID: ${rec.borrower_id} Name: ${rec.name} ${rec.surname}<br>${rec.group}`;
        list_item.className = "list_item";
        list_item.dataset.id = rec.id;

        list_item.onclick = function (list_area)
        {
            display_area.innerHTML = `
            
            <div 
                style=
                "
                    position: relative; 
                    width: fit-content; 
                    height: fit-content
                "
            >
            
                <img 
                    style=
                    "
                        object-fit: cover;
                        padding: 0.2em;
                        background-color: white;
                        border: solid aliceblue 2px;
                        border-radius: 12px;
                    "

                    src=
                    "
                        https://covers.openlibrary.org/b/isbn/${rec.isbn}-L.jpg
                    "
                > 
                        
                <img 
                    style=
                    "
                        height: 2em;
                        padding: 0.5em;
                        left: 26px;
                        bottom: 34px;
                        background-color: #FFFFFF;
                        position: absolute;
                        margin: 0;
                        border: solid black 2px;
                        border-radius: 4px;
                    " 
                    src=
                    "
                        https://barcode.tec-it.com/barcode.ashx?data=${rec.id}
                    "
                >
            </div>
            ${rec.borrower_id} ${rec.email} ${rec.name}`
            let clicked_item = list_area.target.closest(`.list_item`)
            list_area_list.querySelectorAll(".list_item").forEach(function (i)
            {
                i.style.background = "";
            })
            clicked_item.style.background = "var(--color-secondary-container)";
            let idClicked = clicked_item.dataset.id;
            let subset = records.filter((s) =>
            {
                return s.id === idClicked;
            })
            console.log("Subset:", subset[0]);
        };
        list_area_list.appendChild(list_item);
    }

}

async function list_prints()
{
    let enteredVal = search_filter_input.value;
    let enteredTokens = enteredVal.split(" ");
    console.log(enteredTokens);
    let pbFilter = "";
    let operand = "";
    for (const enteredToken of enteredTokens)
    {
        let cleanToken = enteredToken.trim();
        if (cleanToken !== "")
        {
            pbFilter += `${operand} (id = "${cleanToken}" || user  ~ "%${cleanToken}%" || note ~ "%${cleanToken}%" || pages ~ "%${cleanToken}%" || paper ~ "%${cleanToken}%")`;
            operand = " && ";
        }
    }
    console.log(pbFilter);

    // you can also fetch all records at once via getFullList
    const records = await pb.collection('prints').getFullList(
        {
            sort: '-created',
            filter: pbFilter,
            expand: 'user'
        });

    console.log(records)
    list_area_list.innerHTML = ""
    for (const rec of records)
    {
        for (let index = 0; index < 20; index++)
        {
            let list_item = document.createElement("div");
            list_item.innerHTML = `${rec.pages} × ${rec.paper}<br>Email: ${rec.expand.user.email.slice(0, -17)}`;
            list_item.className = "list_item";
            list_item.dataset.id = rec.id;
            list_item.onclick = function (list_area)
            {
                display_area.innerHTML = `
            
            <div 
                style=
                "
                    position: relative; 
                    width: fit-content; 
                    height: fit-content
                "
            >
            
                <img 
                    style=
                    "
                        object-fit: cover;
                        padding: 0.2em;
                        background-color: white;
                        border: solid aliceblue 2px;
                        border-radius: 12px;
                    "

                    src=
                    "
                        https://covers.openlibrary.org/b/isbn/${rec.isbn}-L.jpg
                    "
                > 
                        
                <img 
                    style=
                    "
                        height: 2em;
                        padding: 0.5em;
                        left: 26px;
                        bottom: 34px;
                        background-color: #FFFFFF;
                        position: absolute;
                        margin: 0;
                        border: solid black 2px;
                        border-radius: 4px;
                    " 
                    src=
                    "
                        https://barcode.tec-it.com/barcode.ashx?data=${rec.id}
                    "
                >
            </div>
            ${rec.legacy_book_id} ${rec.title} ${rec.isbn}`

                let clickedOne = list_area.target;
                list_area_list.querySelectorAll(".list_item").forEach(function (i)
                {
                    i.style.background = "";
                })
                clickedOne.style.background = "var(--color-secondary-container)";
                let idClicked = clickedOne.dataset.id;
                console.log(idClicked);
                let subset = records.filter((s) =>
                {
                    return s.id === idClicked;
                })

                console.log(subset);
            };
            list_area_list.appendChild(list_item);
        }
    }

}




async function create_book()
{
    // example create data
    const data = {
        "legacy_book_id": "test",
        "title": "test",
        "author": "test",
        "isbn": "test",
        "price": 123,
        "lost": true,
        "scrapped": true,
        "level": "Brown",
        "subject": "6rfpqizxyx85uzv",
        "classification_label": "test",
        "description": "test",
        "legacy_date_entered": "2022-01-01 10:00:00.123Z"
    };

    try
    {
        const record = await pb.collection('books').create(data);
    }
    catch (error)
    {
        window.alert("YOU DO NOT HAVE THE REQUIRED PERMISSIONS TO COMLPLETE THIS ACTION... HACKER!!!!!!!" + "\n\n" + error)
    }
}

var username = "";
var password = "";

function open_signin_modal(event)
{
    if (pb.authStore.isValid)
    {
        pb.authStore.clear();
        document.getElementById("sign_in_button").innerHTML = "<span style='padding-right: 0.2em; scale:0.8; translate: -1px 0px;' class='material-symbols-outlined'>logout</span>Sign In"
        return;
    }
    document.getElementById("sign_in_dialog").showModal();
    document.addEventListener("keydown", enter_key_pressed_in_sign_in_dialog)
}

function close_sign_in_modal(event)
{
    document.getElementById("sign_in_dialog").close();
}

document.getElementById("sign_in_dialog").addEventListener("close", (event) =>
{
    document.getElementById("email_input").value = ""
    document.getElementById("password_input").value = ""
    document.removeEventListener("keydown", enter_key_pressed_in_sign_in_dialog)
});

function enter_key_pressed_in_sign_in_dialog(event)
{
    if (event.code === 'Enter')
    {
        acceptSigninModal(event)
    }
}

async function acceptSigninModal(event)
{
    email = document.getElementById("email_input").value + "@sanandrea.edu.mt"
    password = document.getElementById("password_input").value

    if (password != "" && email != "@sanandrea.edu.mt" && email != "")
    {
        try
        {
            const auth_data = await pb.collection("users").authWithPassword(email, password)
            document.getElementById("sign_in_button").innerHTML = "<span style='padding-right: 0.2em; scale:0.8; translate: -1px 0px;' class='material-symbols-outlined'>logout</span>Sign Out"
        }
        catch (error)
        {
            window.alert("Wrong username/password" + "\n\n" + error)
            return;
        }
    }
    else
    {
        window.alert("U can't leave the email/pass blank ):<")
        return;
    }
    close_sign_in_modal();
}

const add_book_dialog = document.getElementById("add_book_dialog")

function open_add_book_modal()
{
    window.open(`https://www.google.com/search?&q="${isbnnnn}"&tbm=isch&source=lnms`)
    add_book_dialog.showModal();
}

function close_add_book_modal()
{
    add_book_dialog.close();
}

const settings_dialog = document.getElementById("settings_dialog")

function open_settings_modal()
{
    settings_dialog.showModal();
}

function close_settings_modal()
{
    settings_dialog.close();
}
/*
const ctx = document.getElementById("book_cover_canvas").getContext("2d");
const book_cover_canvas = document.getElementById("book_cover_canvas");
book_cover_canvas.style.width = "1000px";
book_cover_canvas.style.height = "1000px";
book_cover_canvas.width = 1000;
book_cover_canvas.height = 1000;
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, 270, 420);
ctx.fillStyle = "#000000";
ctx.font = "30px poppinss    "
ctx.fillText("lung cancer", 10, 30)
ctx.font = "15px serif"
ctx.fillText("by Gringinu Deposits", 10, 60)
ctx.drawImage(document.getElementById("imag"), -40, 100, 340, 250)
ctx.fillText("(tutorial)", 10, 405)

javascript:
var elementsToKeep = document.querySelectorAll('img');
document.body.remove();
document.head.remove();
document.body = document.createElement("body");
document.head = document.createElement("head");
document.body.style.backgroundColor = 'rgb(26, 28, 24)';
var newImage = new Image();
newImage.src = elementsToKeep[4].currentSrc;
document.body.appendChild(newImage);
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');
const data = {
    "isbn": "test"
};
const record = await pb.collection('book_covers').create(data);*/

