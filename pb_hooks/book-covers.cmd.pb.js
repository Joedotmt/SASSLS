$app.rootCmd.addCommand(
    new Command({
      use: "book_covers",
      run(cmd, args) {
        if (!args[0]) return console.error("Need isbn");
        if (!args[1]) return console.error("Need image");
  
        const [isbn, image] = args;
  
        $app.dao().db().insert("book_covers", { isbn, image }).execute();
      },
    })
  );