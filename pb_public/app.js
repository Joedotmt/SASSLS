// @collapse
const pb = new PocketBase("http://127.0.0.1:8090");
//const pb = new PocketBase('https://library.pockethost.io');

function p(t)
{
    console.log(t);
}

// This is bad. this should come from database
const book_level_colors = "Brown, Yellow, Blue, Green, Red";
const borrower_groups =
    "Teacher, Admin, Maintenance, LSE, 8.1, 8.2, 8.3, 8.4, 9.1, 9.2, 9.3, 9.4, 10.1, 10.2, 10.3, 10.4, 11.1, 11.2, 11.3, 11.4, 12.1, 12.2, 12.3, 12.4";

set_borrower_levels_lists();
set_book_subjects_lists();
set_book_levels_lists();

function show_theme_picker_modal()
{
    document.getElementById('theme_dialog').showModal();
}

localStorage.setItem("theme_settings", "blue green red");
p(localStorage.getItem("theme_settings"));

let books_color = "green";
let borrowers_color = "blue";
let transactions_color = "red";
var loaded_book_records;
if (window.location.hash == "")
{
    window.location.hash = "books";
    p(window.location.hash);
}
let current_page;

collection_change();

function display_panel_book_lost_scrapped_editing_handle()
{
    if (display_panel_book_scrapped_editing.checked)
    {
        display_panel_book_lost_editing.disabled = true;
    } else
    {
        display_panel_book_lost_editing.disabled = false;
    }
    if (display_panel_book_lost_editing.checked)
    {
        display_panel_book_scrapped_editing.disabled = true;
    } else
    {
        display_panel_book_scrapped_editing.disabled = false;
    }
}

document.querySelectorAll(".toggle-chip").forEach((ele) =>
{
    ele.addEventListener("click", function ()
    {
        if (ele.dataset.value == "true")
        {
            ele.firstChild.remove();
            ele.dataset.value = "false";
        } else
        {
            check = document.createElement("span");
            check.className = "material-symbols-outlined";
            check.innerText = "check";
            ele.insertBefore(check, ele.firstChild);
            ele.dataset.value = "true";
        }
    });
});

window.addEventListener(
    "hashchange",
    () =>
    {
        collection_change();
    },
    false
);

// Select all input, select, and textarea elements
const elements = document.querySelectorAll("input, select, textarea");
elements.forEach((element) =>
{
    // Check if the element doesn't have a placeholder attribute
    if (!element.hasAttribute("placeholder"))
    {
        // Add an empty placeholder attribute
        element.setAttribute("placeholder", "");
    }
});

//list_area_search_filters.appendChild(search_area)
search_area.style.background = "var(--color-background)";
//document.querySelector(".filter-button").style.display = "none"

search_view_mode = true;
let display_area_edit_mode_borrower = false;
let display_area_edit_mode = false;
const all_buttons = document.getElementsByTagName("button");
for (const button of all_buttons)
{
    if (!button.classList.contains("segmented-button-button") &&
        !button.classList.contains("no-ripple")
    )
    {
        button.addEventListener("pointerdown", createRipple);
    }
}
add_book_to_borrow_dialog.addEventListener("cancel", (event) =>
{
    event.preventDefault();
    close_lend_book_dialog();
});

delete_borrower_forever_active = false;
iooi43iiore94 = null;
delete_borrower_forever.addEventListener("mousedown", function ()
{
    navigator.vibrate([
        5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1,
    ]);
    iooi43iiore94 = setTimeout(() =>
    {
        navigator.vibrate([50]);
        delete_borrower_forever_text.innerText =
            "Release to DELETE PERMENANTLY";
        delete_borrower_forever_active = true;
    }, 2800);
    delete_borrower_forever.classList.add("ririirriire");
});
document.addEventListener("contextmenu", (event) =>
{
    event.preventDefault();
});

function isTouchDevice()
{
    return "ontouchstart" in window || navigator.msMaxTouchPoints;
}

function watchForHover()
{
    // lastTouchTime is used for ignoring emulated mousemove events
    // that are fired after touchstart events. Since they're
    // indistinguishable from real events, we use the fact that they're
    // fired a few milliseconds after touchstart to filter them.
    let lastTouchTime = 0;

    function enableHover()
    {
        if (new Date() - lastTouchTime < 500) return;
        document.body.classList.add("hasHover");
    }

    function disableHover()
    {
        document.body.classList.remove("hasHover");
    }

    function updateLastTouchTime()
    {
        lastTouchTime = new Date();
    }

    document.addEventListener("touchstart", updateLastTouchTime, true);
    document.addEventListener("touchstart", disableHover, true);
    document.addEventListener("mousemove", enableHover, true);

    enableHover();
}
watchForHover();

if (!("ontouchstart" in document.documentElement))
{
    document.documentElement.className += " no-touch";
}
delete_borrower_forever.addEventListener("mouseup", function ()
{
    clearTimeout(iooi43iiore94);
    navigator.vibrate([0]);
    delete_borrower_forever.classList.remove("ririirriire");
    if (delete_borrower_forever_active)
    {
        delete_borrower(edit_button_borrower.dataset.currentid);
        change_display_area_mode("none", display_area_borrower);

        delete_borrower_forever.style.scale = 0;
        display_panel_edit_details_borrower
            .querySelectorAll("div")
            .forEach((egg) =>
            {
                egg.style.transition = "0.5s";
                egg.style.width = "0";
                egg.style.minWidth = "0";
                egg.style.opacity = "0";
            });
    }
});
delete_borrower_forever.addEventListener("mouseout", function ()
{
    clearTimeout(iooi43iiore94);
    delete_borrower_forever_text.innerText = "Delete Record";
    delete_borrower_forever.classList.remove("ririirriire");
});
nextid_borrower = "";
nextid_book = "";
generatedid_borrower = "Error";
generatedid_book = "Error";
var username = "";
var password = "";
document.getElementById("sign_in_dialog").addEventListener("close", (event) =>
{
    document.getElementById("email_input").value = "";
    document.getElementById("password_input").value = "";
    document.removeEventListener(
        "keydown",
        enter_key_pressed_in_sign_in_dialog
    );
});

function set_borrower_levels_lists()
{
    const groups_array = borrower_groups.split(", ");
    groups_array.forEach((group) =>
    {
        let optionelement = document.createElement("option");
        optionelement.value = group;
        optionelement.innerText = group;

        display_panel_borrower_group_editing.appendChild(optionelement);
    });
}

function set_book_levels_lists()
{
    const color_array = book_level_colors.split(", ");
    color_array.forEach((color) =>
    {
        let optionelement = document.createElement("option");
        optionelement.value = color;
        optionelement.innerText = color;

        book_level_search_select.appendChild(optionelement);

        clone5 = optionelement.cloneNode(true);
        display_panel_book_level_editing.appendChild(clone5);
    });
}

let book_filters = {
    location: new Set([]),
    subject: new Set([]),
    level: new Set([]),
    id_type: new Set([]),
};

function add_book_filter(field, value)
{
    book_filters[field].add(value);
    select_book_level_dialog_search.close();
    filter_select_dialog_location.close();
    search_filter_select_dialog.close();
    display_book_filters();
}

function remove_book_filter(field, value)
{
    book_filters[field].delete(value);
    display_book_filters();
}

function display_book_filters()
{
    p(book_filters);
    document.querySelectorAll(".book_filter_chip").forEach((element) =>
    {
        element.remove();
    });

    for (let index = 0; index < Object.keys(book_filters).length; index++)
    {
        const element = [
            Object.keys(book_filters)[index],
            Object.values(book_filters)[index],
        ];
        element[1].forEach((ele) =>
        {
            filter = document.createElement("button");
            filter.classList.add("chip_dropdown");
            filter.classList.add("book_filter_chip");
            filter.style.background = "var(--color-primary-80)";
            filter.style.border = "none";
            filter.style.paddingLeft = "8px";
            filter.onclick = function ()
            {
                remove_book_filter(element[0], ele);
            };
            filter.innerHTML = `
                                ${ele}
                                <span class="material-symbols-outlined">
                                    close
                                </span>
                                `;
            search_area.insertBefore(filter, search_area.firstChild);
        });
    }
}

async function set_book_subjects_lists()
{
    let optionelement = document.createElement("option");
    optionelement.value = "all";
    optionelement.innerText = "Any";
    optionelement.style.fontSize = "1.2rem";

    kej0f4jj05.appendChild(optionelement);

    //clone1 = optionelement.cloneNode(true)
    //kej0f4jj05___2.appendChild(clone1)

    const book_subject_collection = await pb
        .collection("books_subjects")
        .getFullList({
            sort: "+created",
        });
    for (const book_subject of book_subject_collection)
    {
        let optionelement = document.createElement("option");
        optionelement.value = book_subject.id;
        optionelement.innerText = book_subject.subject;
        optionelement.style.fontSize = "1rem";
        if (book_subject.resource)
        {
            nv9tuni9.appendChild(optionelement);

            clone2 = optionelement.cloneNode(true);
            nv9tuni9_2.appendChild(clone2);
        } else
        {
            kj0f4jj05.appendChild(optionelement);

            clone3 = optionelement.cloneNode(true);
            kj0f4jj05__2.appendChild(clone3);
        }
    }
}

function hide_search_view()
{
    search_view_mode = false;
    //j5498j85t4954j9.innerText = "tune"
    show_display_area();
    search_area.style.width = "0";
    search_area.style.padding = "1em 0";
    search_area.style.minWidth = "0";
    search_area.style.margin = "0";
    search_area.style.overflow = "hidden";
    search_area.style.transform = "scaleX(1)";
}

function show_search_view()
{
    search_view_mode = true;

    //j5498j85t4954j9.innerText = "close"

    if (window.matchMedia("(max-width: 1130px)")) { }

    hide_display_area();
    search_area.style.width = "18em";
    search_area.style.padding = "1em";
    search_area.style.margin = "0 0.5em 0 0";
    search_area.style.transform = "scaleX(1)";
    search_area.style.overflow = "visible";
}

function hide_display_area()
{
    display_area.style.width = "0em";
    display_area.style.flex = "0";
    display_area.style.minWidth = "0";
    display_area.style.overflow = "hidden";
    display_area.style.transform = "scaleX(1)";
    display_area.style.marginLeft = "0";
}

function show_display_area()
{
    //display_area.style.marginLeft = "0.5em"
    //display_area.style.width = "auto"
    //display_area.style.flex = "1"
    //display_area.style.transform = "scaleX(1)"
    //display_area.style.overflowY = "scroll"
}

function swap_search_view()
{
    if (!search_view_mode)
    {
        show_search_view();
    } else
    {
        hide_search_view();
    }
}

function collection_change()
{
    change_display_area_mode("none", display_area_borrower);
    change_display_area_mode("none", display_area);

    collection_select.value = window.location.hash.substring(1);
    current_page = window.location.hash.substring(1);

    let str = document.body.className;
    light_or_dark = "-" + str.substring(str.indexOf("-") + 1);

    container_book.style.display = "none";
    container_borrower.style.display = "none";

    switch (current_page)
    {
        case "books":
            container_book.style.display = "flex";
            book_enable_lend_view(false);
            color = books_color;
            break;
        case "borrowers":
            container_borrower.style.display = "flex";
            book_enable_lend_view(true);
            color = borrowers_color;
            break;
        case "transactions":
            color = transactions_color;
            break;
        case "prints":
            color = transactions_color;
        default:
            color = books_color;
    }
    document.body.className = color + light_or_dark;
    list_selected_collection();
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

const book_state = {
    filters: [],
    add_filter: function (filter) { },
};

async function save_changes_handler_book(event)
{
    if (book_edit_button.dataset.currentid == "creation")
    {
        const data = {
            book_id: generatedid_book,
            legacy_book_id: "DEPRECATED_",
            title: display_panel_book_title_editing.value,
            author: display_panel_book_author_editing.value,
            preview_url_override: display_panel_book_preview_url_override_editing.value,
            isbn: display_panel_book_isbn_editing.value,
            description: display_panel_book_description_editing.value,
            classification_label: display_panel_book_classification_label_editing.value,
            level: display_panel_book_level_editing.value,
            subject: display_panel_book_subject_editing.value,
            lost: display_panel_book_lost_editing.dataset.value,
            scrapped: display_panel_book_scrapped_editing.dataset.value,
            price: display_panel_book_price_editing.value,
        };
        p("CREATING BOOK RECORD WITH DATA: ", data);
        try
        {
            await pb.collection("books").create(data);
        } catch (error)
        {
            console.error(error.data);
            let issue_string = "";

            for (
                let index = 0; index < Object.keys(error.data.data).length; index++
            )
            {
                issue_string += `\n${Object.keys(error.data.data)[index]}: ${Object.values(error.data.data)[index].message
                    }`;
            }
            alert(
                `Error code: ${error.data.code}\nMessage: ${error.data.message}\n\nIssues:${issue_string}`
            );
        }

        await book_display(book_edit_button.dataset.currentid, true);
        await list_books();
        await clickHandler_create(true);
        await change_display_area_mode("display", display_area);
    } else
    {
        const data = {
            title: display_panel_book_title_editing.value,
            author: display_panel_book_author_editing.value,
            preview_url_override: display_panel_book_preview_url_override_editing.value,
            isbn: display_panel_book_isbn_editing.value,
            description: display_panel_book_description_editing.value,
            classification_label: display_panel_book_classification_label_editing.value,
            level: display_panel_book_level_editing.value,
            subject: display_panel_book_subject_editing.value,
            lost: display_panel_book_lost_editing.dataset.value,
            scrapped: display_panel_book_scrapped_editing.dataset.value,
            price: display_panel_book_price_editing.value,
        };
        p("UPDATING BOOK RECORD WITH DATA: ", data);
        await pb
            .collection("books")
            .update(book_edit_button.dataset.currentid, data);
        await list_books();
        await book_display(book_edit_button.dataset.currentid, true);
        await change_display_area_mode("display", display_area);
    }
}

function borrower_close_unsaved_discard_click_handler()
{
    change_display_area_mode("display", display_area_borrower);
    close_unsaved_borrower.close();
    if (edit_button_borrower.dataset.currentid == "creation")
    {
        if (nextid_borrower == "")
        {
            change_display_area_mode("none", display_area_borrower);
            create_borrower_button.style.background = "";
        } else
        {
            borrower_display(nextid_borrower);
        }
    } else
    {
        if (nextid_borrower == "")
        {
            borrower_display(edit_button_borrower.dataset.currentid);
        } else
        {
            borrower_display(nextid_borrower);
        }
    }
}

function book_close_unsaved_discard_click_handler()
{
    book_display(nextid_book, true);
    close_unsaved.close();
    /*
    change_display_area_mode("display", display_area)
    close_unsaved.close();
    if (book_edit_button.dataset.currentid == "creation")
    {
        if (nextid_book == "")
        {
            change_display_area_mode("none", display_area)
            create_button.style.background = "";
        } else
        {
            book_display(nextid_book);
        }
    } 
    else
    {
        if (nextid_book == "")
        {
            book_display(book_edit_button.dataset.currentid);
        } else if (nextid_book == "creation")
        {
            clickHandler_create();
        } else
        {
            book_display(nextid_book);
        }
    }*/
}

async function save_changes_handler_borrower(event)
{
    if (display_area_edit_mode_borrower)
    {
        regex = /^[a-zA-Z ]+$/;
        if (!regex.test(display_panel_borrower_name_editing.value) ||
            !regex.test(display_panel_borrower_name_editing.value)
        )
        {
            alert("only letters allowed");
            return;
        }
        p("egg");
        if (edit_button_borrower.dataset.currentid == "creation")
        {
            const data = {
                borrower_id: generatedid_borrower,
                name: display_panel_borrower_name_editing.value,
                surname: display_panel_borrower_surname_editing.value,
                group: display_panel_borrower_group_editing.value,
            };
            p("CREATING BORROWER RECORD WITH DATA: ", data);
            p("ekekk", await pb.collection("borrowers").create(data));
        } else
        {
            const data = {
                name: display_panel_borrower_name_editing.value,
                surname: display_panel_borrower_surname_editing.value,
                group: display_panel_borrower_group_editing.value,
            };
            p("UPDATING BORROWER RECORD WITH DATA: ", data);
            await pb
                .collection("borrowers")
                .update(edit_button_borrower.dataset.currentid, data);
        }
        await list_borrowers();
        await borrower_display(edit_button_borrower.dataset.currentid, true);
        change_display_area_mode("display", display_area_borrower);
    } else
    {
        change_display_area_mode("edit", display_area_borrower);
    }
}

change_dark_light_theme();

function change_dark_light_theme()
{
    let new_string = document.body.className.replace("light", "dark");
    dark_mode_switcher_icon.innerHTML = "light_mode";
    ir040jr098.src = "3429jr9.svg";
    if (new_string == document.body.className)
    {
        new_string = document.body.className.replace("dark", "light");
        dark_mode_switcher_icon.innerHTML = "dark_mode";
        ir040jr098.src = "4598ggrtg.svg";
    }
    document.body.className = new_string;
}

function logo_easter_egg()
{
    logo_text.style.fontWeight = parseInt(logo_text.style.fontWeight) + 50;
    if (logo_text.style.fontWeight > 900)
    {
        logo_text.innerHTML = `Made by <a target="_blank" rel="external" href="https://permanentlink.github.io/#saslib">Joe Esposito</a>`;
    }
}

function createRipple(event)
{
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    let button_rect = button.getBoundingClientRect();
    circle.classList.add("ripple");
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button_rect.x - radius}px`; //`${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button_rect.y - radius}px`; //`${event.clientY - button.offsetTop - radius}px`;
    setTimeout(function ()
    {
        circle.remove();
    }, 1000);
    button.appendChild(circle);
}

function copy_isbn()
{
    copy_isbn_tooltip.innerHTML = `Copied!`;
    setInterval(function ()
    {
        copy_isbn_tooltip.innerHTML = `Copy`;
    }, 5000);
    var copyText = document.getElementById("display_panel_book_isbn").innerHTML;
    navigator.clipboard.writeText(copyText);
}

function copy_borrower_id_from_books()
{
    copy_borrower_book_tooltip.innerHTML = `Copied!`;
    setInterval(function ()
    {
        copy_borrower_book_tooltip.innerHTML = `Copy`;
    }, 5000);
    var copyText = document.getElementById(
        "id_to_be_copied_from_books"
    ).innerHTML;
    navigator.clipboard.writeText(copyText);
}

function open_account_dialog()
{
    account_dialog.showModal();
    account_dialog.addEventListener("click", (event) =>
    {
        let rect = event.target.getBoundingClientRect();
        if (
            rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        )
        {
            account_dialog.close();
        }
    });
}

function segmented_button_thing(event, element = "")
{
    if (element != "")
    {
        ele = element;
    } else
    {
        ele = event.srcElement;
    }

    if (
        ele.dataset.state === "true" &&
        ele.parentElement.dataset.onlyone != "true"
    )
    {
        ele.dataset.state = false;
        ele.style.backgroundColor = "transparent";
        ele.style.width = "9em";
        ele.parentElement.dataset.value = "none";
    } else
    {
        let false_element;
        let truth_element;
        for (const thingydongy of ele.parentElement.children)
        {
            thingydongy.dataset.state = false;
            thingydongy.style.backgroundColor = "transparent";
            thingydongy.style.width = "9em";
            if (thingydongy.dataset.value == "true")
            {
                truth_element = thingydongy;
            }
            if (thingydongy.dataset.value == "false")
            {
                false_element = thingydongy;
            }
        }

        ele.dataset.state = true;
        ele.style.backgroundColor =
            "color-mix(in hsl, var(--color-primary-container), #00000000 5%)";
        ele.style.width = "10em";

        if (
            truth_element.dataset.state == "true" &&
            false_element.dataset.state == "false"
        )
        {
            ele.parentElement.dataset.value = "false";
        }
        if (
            truth_element.dataset.state == "false" &&
            false_element.dataset.state == "true"
        )
        {
            ele.parentElement.dataset.value = "true";
        }
    }
}

function lend_book_button_click_handler(ev)
{
    lend_book_to_borrower(
        ev.srcElement.dataset.currentid,
        edit_button_borrower.dataset.currentid
    );
    close_lend_book_dialog();
    display_panel_details.style.display = "none";
}

function book_enable_lend_view(enable)
{
    if (enable)
    {
        display_area_top_book_view.style.display = "none";
        display_area_top_lend_view.style.display = "flex";
        add_book_to_borrow_dialog_container.appendChild(container_book);
    } else
    {
        display_area_top_book_view.style.display = "flex";
        display_area_top_lend_view.style.display = "none";
        document.body.appendChild(container_book);
    }
}

function change_display_area_mode(mode, _display_area)
{
    // TEMPORARY
    let ele_type;
    if (_display_area === display_area)
    {
        ele_type = "book";
    }
    if (_display_area == display_area_borrower)
    {
        ele_type = "borrower";
    }

    function borrower_edit()
    {
        display_panel_edit_details_borrower.style.display = "block";

        display_panel_details_borrower.style.display = "none";
        edit_button_borrower_label.innerText = "Save";
        edit_button_borrower_label.style.color = "var(--color-background)";
        edit_button_borrower.style.backgroundColor = "var(--color-primary)";
        edit_button_borrower.style.border = "none";
        returntextjinfo4_borrower.innerText = "Cancel";
        returnbutton54985t8_borrower.onclick =
            borrower_open_discard_draft_modal;
        display_area_edit_mode_borrower = true;
        returnbutton54985t8_borrower.style.display = "flex";
        edit_button_borrower.style.display = "flex";
    }

    function borrower_display()
    {
        display_panel_edit_details_borrower.style.display = "none";
        display_panel_details_borrower.style.display = "block";
        edit_button_borrower_label.innerText = "Edit";
        edit_button_borrower_label.style.color = "";
        edit_button_borrower.style.backgroundColor = "";
        edit_button_borrower.style.border = "";
        returntextjinfo4_borrower.innerText = "Return";
        returnbutton54985t8_borrower.onclick = null;
        display_area_edit_mode_borrower = false;
        returnbutton54985t8_borrower.style.display = "flex";
        edit_button_borrower.style.display = "flex";
    }

    function borrower_none()
    {
        returnbutton54985t8_borrower.style.display = "none";
        edit_button_borrower.style.display = "none";
        display_panel_details_borrower.style.display = "none";
        display_panel_edit_details_borrower.style.display = "none";
        edit_button_borrower.dataset.currentid = "none";
    }

    function book_none()
    {
        //_display_area.style.display = "none"
        //display_area_top_book_view.style.display = "none"
        //display_area_top_book_view_edit.style.display = "none"
        //display_panel_details.style.display = "none";
        //display_panel_edit_details.style.display = "none";
    }

    function book_display()
    {
        display_area_edit_mode = false;
        _display_area.querySelector(".display_panel_edit").style.display =
            "none";
        _display_area.querySelector(".display_panel_display").style.display =
            "block";

        //display_panel_edit_details.style.display = "none";
        //display_panel_details.style.display = "block";

        if (current_page == "books")
        {
            //display_area_top_book_view.style.display = "flex"
            //display_area_top_book_view_edit.style.display = "none"
            //display_area_edit_mode = false;
        }
    }

    function book_edit()
    {
        p(_display_area);
        _display_area.querySelector(".display_panel_edit").style.display =
            "block";
        _display_area.querySelector(".display_panel_display").style.display =
            "none";
        display_area_edit_mode = true;

        //display_panel_edit_details.style.display = "block";
        //display_panel_details.style.display = "none";

        //display_area_top_book_view.style.display = "none"
        //display_area_top_book_view_edit.style.display = "flex"
    }
    if (ele_type == "book")
    {
        switch (mode)
        {
            case "display":
                book_display();
                break;
            case "edit":
                book_edit();
                break;
            case "creation":
                book_edit();
                break;
            case "none":
                book_none();
                break;
            default:
                break;
        }
    } else if ("borrower")
    {
        switch (mode)
        {
            case "display":
                borrower_display();
                break;
            case "edit":
                borrower_edit();
                break;
            case "creation":
                borrower_edit();
                break;
            case "none":
                borrower_none();
                break;
            default:
                break;
        }
    }
}

function book_open_discard_draft_modal()
{
    close_unsaved.showModal();
}

function borrower_open_discard_draft_modal()
{
    close_unsaved_borrower.showModal();
}

function create_random_string(length)
{
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++)
    {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
async function generate_unique_book_id()
{
    generated_id = "";
    for (let i = 0; i < 1000; i++)
    {
        try
        {
            generated_id = create_random_string(4);
            await pb
                .collection("books")
                .getFirstListItem(`book_id="${generated_id}"`);
            console.error(
                "trying to generate a book id again because of collisions"
            );
        } catch (err)
        {
            if (err.data.code == "404")
            {
                return generated_id;
            }
        }
    }
}

function search_sortby_ascending_book_change()
{
    if (search_sortby_ascending_book.dataset.ascending == "+")
    {
        search_sortby_ascending_book.dataset.ascending = "-";
        on4ir4r0943.style.rotate = "360deg";
        timeout_uofrrofi = setTimeout(function ()
        {
            on4ir4r0943.style.transitionDuration = "0s";
            on4ir4r0943.style.rotate = "0deg";
        }, 200);
    } else
    {
        try
        {
            clearTimeout(timeout_uofrrofi);
        } catch (error) { }
        search_sortby_ascending_book.dataset.ascending = "+";
        on4ir4r0943.style.transitionDuration = "0.2s";
        on4ir4r0943.style.rotate = "180deg";
    }
    list_books();
}
async function deprecate_book_id(id)
{
    p("decrapating: ", id);
    const rec = await pb.collection("books").getOne(id, {});
    await pb
        .collection("books")
        .update(id, { legacy_book_id: "DEPRECATED_" + rec.legacy_book_id });
    await list_books();
    await book_display(rec.id);
}
async function list_books()
{
    document.body.appendChild(page_number_changer_books);
    let enteredVal = search_filter_input.value;
    let enteredTokens = enteredVal.split(" ");
    p(enteredTokens);
    let pbFilter = "";
    let operand = "";

    for (const enteredToken of enteredTokens)
    {
        let cleanToken = enteredToken.trim();
        if (cleanToken !== "")
        {
            pbFilter += `(${operand} (legacy_book_id = "${cleanToken}" || book_id = "${cleanToken}" || title  ~ "%${cleanToken}%" || isbn = "${cleanToken}"))`;
            operand = " && ";
        }
    }
    if (book_search_selector_lost_thing.dataset.value != "none")
    {
        if (pbFilter != "")
        {
            pbFilter += " && ";
        }
        pbFilter +=
            "lost = " + book_search_selector_lost_thing.dataset.value + "";
    }
    if (book_search_selector_scrapped_thing.dataset.value != "none")
    {
        if (pbFilter != "")
        {
            pbFilter += " && ";
        }
        pbFilter +=
            "scrapped = " +
            book_search_selector_scrapped_thing.dataset.value +
            "";
    }
    if (book_level_search_select.value != "all")
    {
        if (pbFilter != "")
        {
            pbFilter += " && ";
        }
        pbFilter += "level = '" + book_level_search_select.value + "'";
    }
    if (subject_search_select_shadow.value != "all")
    {
        if (pbFilter != "")
        {
            pbFilter += " && ";
        }
        pbFilter += "subject = '" + subject_search_select_shadow.value + "'";
    }
    if (search_books_id_type_select.dataset.value != "none")
    {
        if (pbFilter != "")
        {
            pbFilter += " && ";
        }
        if (search_books_id_type_select.dataset.value == "true")
        {
            pbFilter += `legacy_book_id !~ 'DEPRECATED_'`;
        } else if (search_books_id_type_select.dataset.value == "false")
        {
            pbFilter += `legacy_book_id ~ 'DEPRECATED_'`;
        }
    }
    p("pbfilter: ", pbFilter);

    pbSort = search_sortby_ascending_book.dataset.ascending + j54f9954j.value;




    query_response = await pb
        .collection("books")
        .getList(page_number_changer_books.dataset.pagenumber, 100, {
            sort: pbSort,
            filter: pbFilter,
        });
    loaded_book_records = query_response.items;








    if (current_page == "books")
    {
        list_area_list.innerHTML = `
            <button id="create_book_button" onclick="clickHandler_create()" class="list-button list-item create-button">
                + Create Book
            </button>
        `;
        list_area_list
            .querySelector("button")
            .addEventListener("pointerdown", createRipple);
    } else
    {
        list_area_list.innerHTML = "";
    }

    for (const rec of loaded_book_records)
    {
        let list_item = document.createElement("button");
        list_item.className = "list-button list-item";
        list_item.dataset.id = rec.id;
        list_item.addEventListener("click", book_click_handler);
        list_area_list.appendChild(list_item);
        list_item.addEventListener("pointerdown", createRipple);

        let preview_image = document.createElement("img");
        preview_image.className = "preview-image";

        if (rec.preview_url_override == "")
        {
            preview_image.setAttribute(
                "src",
                `https://covers.openlibrary.org/b/isbn/${rec.isbn}-S.jpg`
            );
        } else
        {
            preview_image.setAttribute("src", rec.preview_url_override);
        }
        preview_image.style.marginRight = "0.5em";
        let info_div = document.createElement("div");
        info_div.className = "list-item-info-text";

        if (rec.legacy_book_id.match("DEPRECATED_"))
        {
            info_div.innerHTML = `${rec.title} 
            <label style="font-family:var(--the-font)">
                ${rec.book_id}
            </label>`;
        } else
        {
            info_div.innerHTML = `${rec.title} 
            <label style="font-family:var(--the-font)">
                ${rec.legacy_book_id} ${rec.book_id}
            </label>`;
        }

        list_item.appendChild(preview_image);
        list_item.appendChild(info_div);
    }
    highlight_selected_item(book_edit_button.dataset.currentid, list_area_list);


    if (query_response.totalPages > 1)
    {
        document.getElementById("tttttttt112").innerText = `Page ${page_number_changer_books.dataset.pagenumber} of ${query_response.totalPages}`;
        page_number_changer_books.dataset.maxpages = query_response.totalPages;
        if (
            page_number_changer_books.dataset.pagenumber > query_response.totalPages
        )
        {
            page_number_changer_books.dataset.pagenumber =
                query_response.totalPages;
        }
        page_number_changer_books.style.display = "flex";
    }
    else
    {
        page_number_changer_books.style.display = "none";
    }
    list_area_list.appendChild(page_number_changer_books);
}

function playOpenSound()
{
    let randomInteger = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    let audio = new Audio("sfx/" + randomInteger + ".mp3");
    audio.volume = 0.3;
    audio.play();
}

function book_click_handler(e)
{
    if (book_edit_button.dataset.currentid == e.srcElement.dataset.id)
    {
        return;
    }
    book_display(e.srcElement.dataset.id, false);
    playOpenSound();
}

async function book_display(ARGUMENT_ID, excused_from_dialog = false, start_in_edit_mode = false)
{
    if (ARGUMENT_ID == "creation")
    {
        clickHandler_create(excused_from_dialog);
        return;
    }

    let useid = ARGUMENT_ID; //ev.srcElement.dataset.id;
    let book = loaded_book_records.find((s) =>
    {
        return s.id == useid;
    });

    if (display_area_edit_mode && !excused_from_dialog)
    {
        nextid_book = ARGUMENT_ID;
        book_open_discard_draft_modal();
        return;
    }
    nextid_book = "";

    if (ARGUMENT_ID == "")
    {
        book_edit_button.dataset.currentid = "";
        change_display_area_mode("none", display_area);
        return;
    }

    if (start_in_edit_mode)
    {
        change_display_area_mode("edit", display_area);
    }
    else
    {
        change_display_area_mode("display", display_area);
    }


    highlight_selected_item(useid, list_area_list);

    display_panel_book_cover.src = "";

    book_edit_button.dataset.currentid = ARGUMENT_ID;

    /////////DISPLAY PANEL NONSENCE/////////////////////////////////////
    display_panel_book_system_id.innerHTML = "SYS_ID: " + book.id;
    display_panel_book_book_id.innerHTML = "ID: " + book.book_id;
    if (book.legacy_book_id.match("DEPRECATED_"))
    {
        display_panel_book_legacy_book_id.innerHTML = "";
    } else
    {
        display_panel_book_legacy_book_id.innerHTML =
            "IDL: " + book.legacy_book_id;
    }
    display_panel_book_title.innerHTML = book.title;
    display_panel_book_author.innerHTML = "by " + book.author;
    display_panel_book_isbn.innerHTML = "ISBN: " + book.isbn;

    if (book.preview_url_override == "")
    {
        display_panel_book_cover.src = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
    } else
    {
        display_panel_book_cover.src = book.preview_url_override;
    }

    display_panel_book_description.innerHTML = book.description;
    display_panel_book_classification_label.innerHTML =
        "CLL: " + book.classification_label;

    if (book.subject != "")
    {
        const book_subject_jr8r04 = await pb
            .collection("books_subjects")
            .getOne(book.subject, {});
        display_panel_book_subject.innerHTML = "Subject: " + book_subject_jr8r04.subject;
    }
    else
    {
        display_panel_book_subject.style.display = "none";
    }

    if (book.level != "")
    {
        display_panel_book_level.innerHTML = "Level: " + book.level;
    }
    else
    {
        display_panel_book_level.style.display = "none";
    }



    display_panel_book_lost.style.display = book.lost ? "block" : "none";
    display_panel_book_scrapped.style.display = book.scrapped ?
        "block" :
        "none";
    if (book.price > 0)
    {
        display_panel_book_price.style.display = "block";
        display_panel_book_price.innerHTML = "Price: " + book.price + " EUR";
    }
    else
    {
        display_panel_book_price.style.display = "none";
    }

    if (book.legacy_date_entered == "")
    {
        display_panel_book_created.innerHTML = "Created: " + book.created;
    } else
    {
        display_panel_book_created.innerHTML = "Legacy Created: " + book.legacy_date_entered;
    }

    display_panel_book_system_created.innerHTML = "SYS_CREATED: " + book.created;
    display_panel_book_updated.innerHTML = "Updated: " + book.updated;

    ///////////////////////////////////////////////////////////
    display_panel_book_title_editing.value = book.title;
    display_panel_book_author_editing.value = book.author;

    if (book.preview_url_override === "")
    {
        display_panel_book_preview_url_override_editing.placeholder =
            "Automatic";
    }
    display_panel_book_preview_url_override_editing.value =
        book.preview_url_override;

    display_panel_book_book_id_editing.innerText = "ID: " + book.book_id;

    if (book.legacy_book_id.match("DEPRECATED_"))
    {
        display_panel_book_legacy_book_id_editing.innerText = "";
        j5498.style.display = "none";
    } else
    {
        display_panel_book_legacy_book_id_editing.innerText =
            "IDL: " + book.legacy_book_id;
        j5498.style.display = "flex";
    }

    display_panel_book_isbn_editing.value = book.isbn;
    display_panel_book_description_editing.value = book.description;
    display_panel_book_classification_label_editing.value =
        book.classification_label;
    display_panel_book_level_editing.value = book.level;
    display_panel_book_subject_editing.value = book.subject;

    if (!book.lost)
    {
        display_panel_book_lost_editing
            .querySelectorAll("button[data-value=true]")
            .forEach((element) =>
            {
                element.dataset.state = "true";
                segmented_button_thing("", element);
            });
    } else
    {
        display_panel_book_lost_editing
            .querySelectorAll("button[data-value=false]")
            .forEach((element) =>
            {
                element.dataset.state = "false";
                segmented_button_thing("", element);
            });
    }

    if (!book.scrapped)
    {
        display_panel_book_scrapped_editing
            .querySelectorAll("button[data-value=true]")
            .forEach((element) =>
            {
                element.dataset.state = "true";
                segmented_button_thing("", element);
            });
    } else
    {
        display_panel_book_scrapped_editing
            .querySelectorAll("button[data-value=false]")
            .forEach((element) =>
            {
                element.dataset.state = "false";
                segmented_button_thing("", element);
            });
    }

    //display_panel_book_lost_editing.dataset.value = book.lost
    //display_panel_book_scrapped_editing.dataset.value = book.scrapped
    display_panel_book_price_editing.value = book.price;
}
async function clickHandler_create(excused_from_dialog = false)
{
    playOpenSound();

    if (display_area_edit_mode && !excused_from_dialog)
    {
        nextid_book = "creation";
        book_open_discard_draft_modal();
        return;
    }

    //delete_borrower_forever.style.display = "none"
    book_edit_button.dataset.currentid = "creation";

    await generate_unique_book_id().then((generated_id_response) =>
    {
        generatedid_book = generated_id_response;
    });

    display_panel_book_title_editing.value = "";
    display_panel_book_author_editing.value = "";
    display_panel_book_preview_url_override_editing.value = "";
    display_panel_book_book_id_editing.innerText = "ID: " + generatedid_book;

    display_panel_book_legacy_book_id_editing.innerText = "";
    j5498.style.display = "none";

    display_panel_book_isbn_editing.value = "";
    display_panel_book_description_editing.value = "";
    display_panel_book_classification_label_editing.value = "";
    display_panel_book_level_editing.value = "";
    display_panel_book_subject_editing.value = "";
    //display_panel_book_lost_editing.value = ""
    //display_panel_book_scrapped_editing.value = ""
    display_panel_book_price_editing.value = "";

    let clickedOne = create_book_button;
    list_area_list.querySelectorAll(".list-item").forEach(function (i)
    {
        i.style.background = "";
        //i.style.borderRadius = "";
        //i.style.margin = "";
        //i.style.padding = "";
    });
    //clickedOne.style.cssText = "border-radius: 1.5em !important; background: var(--color-secondary-container); margin: 0.2em !important; padding: 0.8em !important";
    clickedOne.style.background = "var(--color-on-surface-2)";

    change_display_area_mode("edit", display_area);
}
async function list_borrowers()
{
    let enteredVal = search_filter_input_borrower.value;
    let enteredTokens = enteredVal.split(" ");
    p(enteredTokens);
    let pbFilter = "";
    let operand = "";

    for (const enteredToken of enteredTokens)
    {
        let cleanToken = enteredToken.trim();
        if (cleanToken !== "")
        {
            pbFilter += `(${operand} (borrower_id = "${cleanToken}" || name ~ "%${cleanToken}%" || surname ~ "%${cleanToken}%" || group ~ "%${cleanToken}%"))`;
            operand = " && ";
        }
    }
    p("pbfilter: ", pbFilter);

    pbSort = "-created";
    //pbSort = search_sortby_ascending_book.dataset.ascending + j54f9954j.value

    all_borrower_records = await pb.collection("borrowers").getFullList({
        sort: pbSort,
        filter: pbFilter,
    });

    list_area_list_borrower.innerHTML = `
        <button id="create_borrower_button" data-id="creation" onclick="borrower_display(event.srcElement.dataset.id)" style="border-bottom: 2px dashed var(--color-neutral-variant60);" class="list-button list-item">
            + Create Borrower
        </button>
    `;
    list_area_list_borrower
        .querySelector("button")
        .addEventListener("pointerdown", createRipple);

    for (const rec of all_borrower_records)
    {
        if (rec.id != "deletedborrower")
        {
            let list_item = document.createElement("button");
            list_item.className = "list-button list-item";
            list_item.dataset.id = rec.id;
            list_area_list_borrower.appendChild(list_item);
            list_item.addEventListener("pointerdown", createRipple);
            list_item.setAttribute(
                "onclick",
                "borrower_display(event.srcElement.dataset.id)"
            );
            let preview_image = document.createElement("img");
            preview_image.className = "preview-image";
            switch (rec.group)
            {
                case "Teacher":
                    image_group = "figure_one_purple.png";
                    break;
                case "Admin":
                    image_group = "figure_one_green.png";
                    break;
                case "Admin":
                    image_group = "figure_one_yellow.png";
                    break;
                case "LSE":
                    image_group = "figure_one_red.png";
                    break;
                case "Maintenance":
                    image_group = "figure_one_white.png";
                    break;
                default:
                    image_group = "figure_one_blue.png";
                    break;
            }
            preview_image.setAttribute("src", image_group);
            preview_image.style.background = "transparent";
            preview_image.style.border = "transparent";
            preview_image.style.marginRight = "0.5em";
            let info_div = document.createElement("div");
            info_div.className = "list-item-info-text";

            info_div.innerHTML = `
            ${rec.name} ${rec.surname} 
            <label style="font-family: var(--the-font); display: flex; width: 100%; justify-content: space-between;">
                ${rec.group}
                <div style="text-align: right; background: var(--color-surface-5); padding: 0.1em 0.3em; border-radius: 8px; font-family: var(--the-robo-font)">
                    ${rec.borrower_id}
                </div>
            </label>
            `;

            list_item.appendChild(preview_image);
            list_item.appendChild(info_div);
        }
    }
}

function close_lend_book_dialog()
{
    dpdb_add_button_FAKE.style = null;
    iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
    iirirri9i49.style.opacity = "1";
    add_book_to_borrow_dialog.style.transitionDuration = "0.4s";
    add_book_to_borrow_dialog.style.opacity = "0";
    add_book_to_borrow_dialog.style.width = "0";
    add_book_to_borrow_dialog.style.height = "0";
    eggririir = 1;
    eer4r4 = setInterval(() =>
    {
        document.body.style.setProperty("--j95r4ji5r-opacity", eggririir);
        eggririir -= 0.05;
    }, 10);
    add_book_to_borrow_dialog.style.transformOrigin = "center";
    setTimeout(() =>
    {
        add_book_to_borrow_dialog.close();
        add_book_to_borrow_dialog.style.display = "none";
        clearInterval(eer4r4);
    }, 500);
}

function add_borrower_book_button_handler(event)
{
    document.body.style.setProperty("--j95r4ji5r-opacity", "1");
    iirirri9i49.style.opacity = "1";
    iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
    add_book_to_borrow_dialog.style = null;
    add_book_to_borrow_dialog.style.display = "flex";
    add_book_to_borrow_dialog.showModal();
    container_book.style.display = "flex";
    list_books();

    var zeBOX = dpdb_add_button.getBoundingClientRect();

    book_enable_lend_view(true);

    p(zeBOX);

    finaltargetWidth = add_book_to_borrow_dialog.getBoundingClientRect().width;
    finaltargetHeight =
        add_book_to_borrow_dialog.getBoundingClientRect().height;

    dpdb_add_button_FAKE.style.display = "flex";
    iirirri9i49.style.transform = `scaleX(1) scaleY(1)`;
    dpdb_add_button_FAKE.style.width = zeBOX.width + "px";
    dpdb_add_button_FAKE.style.height = zeBOX.height + "px";
    dpdb_add_button_FAKE.style.left = zeBOX.left + "px";
    dpdb_add_button_FAKE.style.top = zeBOX.top + "px";

    add_book_to_borrow_dialog.style.transition = "0s";
    add_book_to_borrow_dialog.style.display = "flex";
    //add_book_to_borrow_dialog.style.transform = `scaleX(0.1) scaleY(0.1)`;
    //add_book_to_borrow_dialog.style.transform = `scaleX(${zeBOX.width / finaltargetWidth}) scaleY(${zeBOX.height / finaltargetHeight})`;
    add_book_to_borrow_dialog.style.width = zeBOX.width + "px";
    add_book_to_borrow_dialog.style.height = zeBOX.height + "px";
    add_book_to_borrow_dialog.style.left = zeBOX.left + "px";
    add_book_to_borrow_dialog.style.top = zeBOX.top + "px";
    add_book_to_borrow_dialog.style.opacity = "0";
    iirirri9i49.style.transform = "scaleX(1) scaleY(1)";

    setTimeout(() =>
    {
        iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
        add_book_to_borrow_dialog.style.transition =
            "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
        iirirri9i49.style.transition =
            "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
        dpdb_add_button_FAKE.style.display = "flex";
        iirirri9i49.style.transform = `scaleX(${finaltargetWidth / zeBOX.width
            }) scaleY(${finaltargetHeight / zeBOX.height})`;
        dpdb_add_button_FAKE.style.width = finaltargetWidth + "px";
        dpdb_add_button_FAKE.style.height = finaltargetHeight + "px";
        dpdb_add_button_FAKE.style.left = "50%";
        dpdb_add_button_FAKE.style.top = "50%";
        dpdb_add_button_FAKE.style.translate = "-50% -50%";

        //add_book_to_borrow_dialog.style.transform = `scaleX(1) scaleY(1)`;
        add_book_to_borrow_dialog.style.width = finaltargetWidth + "px";
        add_book_to_borrow_dialog.style.height = finaltargetHeight + "px";
        add_book_to_borrow_dialog.style.left = "50%";
        add_book_to_borrow_dialog.style.top = "50%";
        add_book_to_borrow_dialog.style.translate = "-50% -50%";
    }, 1);

    setTimeout(() =>
    {
        iirirri9i49.style.transition = "0.1s";
        iirirri9i49.style.opacity = "0";
        add_book_to_borrow_dialog.style.opacity = "1";
    }, 150);

    setTimeout(() =>
    {
        dpdb_add_button_FAKE.style = null;
        //iirirri9i49.style.transform = "scaleX(1) scaleY(1)"
        iirirri9i49.style.opacity = "1";
    }, 1000);
}
async function lend_book_to_borrower(bookid, borrowerid)
{
    const data = {
        person: borrowerid,
        book: bookid,
        returned: false,
    };
    p("TRANSACTION CREATION: ", data);
    await pb.collection("transactions").create(data);
    borrower_display(borrowerid);
}
async function delete_borrower(id)
{
    const records = await pb.collection("transactions").getFullList({
        filter: `person = '${id}'`,
    });
    records.forEach((rec) =>
    {
        const data = {
            person: "deletedborrower",
        };
        const record = pb.collection("transactions").update(rec.id, data);
    });
    await pb.collection("borrowers").delete(id);
    list_borrowers();
}

async function borrower_display(borrowerId, excused_from_dialog = false)
{
    playOpenSound();

    const isCreation = borrowerId === "creation";
    let borrower = {};

    if (display_area_edit_mode_borrower && !excused_from_dialog)
    {
        const hasUnsavedChanges = [
            display_panel_borrower_name_editing.value,
            display_panel_borrower_surname_editing.value,
            display_panel_borrower_group_editing.value,
        ].some((value) => value !== "");

        if (hasUnsavedChanges)
        {
            nextid_borrower = borrowerId;
            borrower_open_discard_draft_modal();
            return;
        }
    }

    nextid_borrower = "";

    if (isCreation)
    {
        delete_borrower_forever.style.display = "none";
        change_display_area_mode("edit", display_area_borrower);
        borrower = await borrower_create_blank();
    } else
    {
        borrower = await handleBorrowerDisplay(borrowerId);
    }

    updateBorrowerEditingPanel(borrower);
    if (!isCreation)
    {
        updateBorrowerDisplayPanel(borrower);
        await updateBorrowerBooks(borrower.id);
    }

    highlight_selected_item(borrowerId, list_area_list_borrower);
}

async function borrower_create_blank()
{
    try
    {
        const response = await fetch("borrowers_id_list_length_3.txt");
        const text = await response.text();
        generatedid_borrower = generate_unique_borrower_id(text);
    } catch (e)
    {
        console.error(e);
    }
    return (borrower = {
        name: "",
        surname: "",
        id: generatedid_borrower,
        group: "",
    });
}

async function handleBorrowerDisplay(borrowerId)
{
    delete_borrower_forever.style.display = "flex";
    change_display_area_mode("display", display_area_borrower);
    return all_borrower_records.find((borrower) => borrower.id === borrowerId);
}

function updateBorrowerEditingPanel(borrower)
{
    display_panel_borrower_name_editing.value = borrower.name;
    display_panel_borrower_surname_editing.value = borrower.surname;
    display_panel_borrower_borrower_id_editing.innerText = `ID: ${borrower.id}`;
    display_panel_borrower_group_editing.value = borrower.group;

    edit_button_borrower.dataset.currentid = borrower.id;
}

function updateBorrowerDisplayPanel(borrower)
{
    dpdb_name.innerText = borrower.name;
    dpdb_surname.innerHTML = `&nbsp${borrower.surname}`;
    dpdb_borrower_id.innerText = `ID: ${borrower.borrower_id}`;
    dpdb_group.innerText = `Group: ${borrower.group}`;
    dpdb_created.innerText = `Created: ${borrower.created}`;
    dpdb_updated.innerText = `Updated: ${borrower.updated}`;
    dpdb_id.innerText = `SYS_ID: ${borrower.id}`;
    dpdb_add_button.dataset.borrowerid = borrower.id;
}

async function updateBorrowerBooks(borrowerId)
{
    try
    {
        const transactionList = await pb
            .collection("transactions")
            .getFullList({
                filter: `person.id = "${borrowerId}" && returned = false`,
                expand: "book",
            });

        document
            .querySelectorAll(".book_view")
            .forEach((bookView) => bookView.remove());

        transactionList.forEach((transaction) =>
        {
            const bookView = createBookView(transaction);
            borrower_currently_borrowing_books.appendChild(bookView);
        });
    } catch (e)
    {
        console.error(e);
    }
}

function createBookView(transaction)
{
    const book = transaction.expand.book;
    const previewImageUrl =
        book.preview_url_override ||
        `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;

    const bookView = document.createElement("div");
    bookView.classList.add("book_view");
    bookView.innerHTML = `
        <div style="display: flex; border-top: solid var(--color-surface-5) 2px;">
            <div style="margin-top: 0.5em;">
                <img style="object-fit: cover; padding: 0.2em; width: 6em; height: calc(100% - 1em); background-color: var(--color-inverse-surface); border-radius: 0.6em;" src="${previewImageUrl}">
            </div>
            <div style="margin-bottom: 0.5em; margin-top: 0.5em; display: flex; align-items: center; width: 100%; justify-content: left; margin-left: 1em;">
                <div style="width: 100%">
                    <div style="font-weight: bold; font-size: xx-large; text-wrap: wrap;">
                        ${book.title}
                    </div>
                    <div style="margin-bottom: 0.3em; padding: 0.3em; border-radius: 0.3em; font-size: 1.1em; background-color: var(--color-surface-3);">
                        <label style="font-family:var(--the-robo-font)">ID: ${book.book_id}</label><br>
                        <label style="font-family:var(--the-robo-font)">ISBN: ${book.isbn}</label>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: end;">
                        <button onclick="return_book('${transaction.id}','${transaction.person}');" class="button-circle">
                            <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="material-symbols-outlined">tab_close</span>
                        </button>
                        <button style="margin-left: 0.3em;" class="button-circle">
                            <span class="material-symbols-outlined">open_in_new</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    return bookView;
}

function highlight_selected_item(id, list_element)
{
    // Catching error just in case
    if (list_element == null)
    {
        console.error("The list element is null");
        return;
    }

    list_element
        .querySelectorAll(".list-item")
        .forEach((item) => (item.style.background = ""));

    // If the id is blank then dont highlight a new one
    if (id != "")
    {
        const clickedOne = list_element.querySelector(
            `button[data-id="${id}"]`
        );
        if (clickedOne != null)
        {
            clickedOne.style.background = "var(--color-on-surface-2)";
        }
    }
}

async function return_book(id, person)
{
    await pb.collection("transactions").update(id, { returned: true });
    borrower_display(person);
}

function generate_unique_borrower_id(text)
{
    try
    {
        let randInt = Math.floor(Math.random() * 46655) * 3;
        p(text);
        return (generated_id = text.substring(randInt, randInt + 3));
        //const data_new = { "borrower_id": generated_id };
        //pb.collection('borrowers').update(record_id, data_new);
    } catch (err)
    {
        if (err.data.data.borrower_id.code == "validation_not_unique")
        {
            generate_unique_borrower_id(text);
        }
    }
}

function open_signin_modal(event)
{
    if (pb.authStore.isValid)
    {
        pb.authStore.clear();
        document.getElementById("sign_in_button").innerHTML =
            "<span style='padding-right: 0.2em; scale:0.8; translate: -1px 0px;' class='material-symbols-outlined'>logout</span>Sign In";
        return;
    }
    document.getElementById("sign_in_dialog").showModal();
    document.addEventListener("keydown", enter_key_pressed_in_sign_in_dialog);
}

function close_sign_in_modal(event)
{
    document.getElementById("sign_in_dialog").close();
}

function enter_key_pressed_in_sign_in_dialog(event)
{
    if (event.code === "Enter")
    {
        acceptSigninModal(event);
    }
}
async function acceptSigninModal(event)
{
    email = document.getElementById("email_input").value + "@sanandrea.edu.mt";
    password = document.getElementById("password_input").value;

    if (password != "" && email != "@sanandrea.edu.mt" && email != "")
    {
        try
        {
            const auth_data = await pb
                .collection("users")
                .authWithPassword(email, password);
            document.getElementById("sign_in_button").innerHTML =
                "<span style='padding-right: 0.2em; scale:0.8; translate: -1px 0px;' class='material-symbols-outlined'>logout</span>Sign Out";
        } catch (error)
        {
            window.alert("Wrong username/password" + "\n\n" + error);
            return;
        }
    } else
    {
        window.alert("U can't leave the email/pass blank ):<");
        return;
    }
    close_sign_in_modal();
}
function previous_page(event)
{
    page_number_changer = event.srcElement.closest(".page-number-changer");
    if (page_number_changer.dataset.pagenumber - 1 >= 1)
    {
        page_number_changer.dataset.pagenumber -= 1; list_books();
    }
}
function next_page(event)
{
    page_number_changer = event.srcElement.closest(".page-number-changer");
    if (page_number_changer.dataset.maxpages >= parseInt(page_number_changer.dataset.pagenumber) + 1)
    {
        page_number_changer.dataset.pagenumber = parseInt(page_number_changer.dataset.pagenumber) + 1;
        list_books();
    }
}