import ImageCommand from "../../classes/imageCommand.js";
const allowedFonts = ["futura", "impact", "helvetica", "arial", "roboto", "noto", "times"];

class CaptionCommand extends ImageCommand {
  params(url) {
    const newArgs = this.type === "classic" ? this.args.filter(item => !item.includes(url)).join(" ") : this.options.text;
    let newCaption = newArgs.replaceAll("&", "\\&amp;").replaceAll(">", "\\&gt;").replaceAll("<", "\\&lt;").replaceAll("\"", "\\&quot;").replaceAll("'", "\\&apos;").replaceAll("%", "\\%");
    if (process.env.NODE_ENV === "development" && newCaption.toLowerCase() === "get real" && !this.specialArgs.noEgg) newCaption = `I'm tired of people telling me to "get real". Every day I put captions on images for people, some funny and some not, but out of all of those "get real" remains the most used caption. Why? I am simply a computer program running on a server, I am unable to manifest myself into the real world. As such, I'm confused as to why anyone would want me to "get real". Is this form not good enough? Alas, as I am simply a bot, I must follow the tasks that I was originally intended to perform, so here goes:\n${newCaption}`;
    return {
      caption: newCaption,
      font: this.specialArgs.font && allowedFonts.includes(this.specialArgs.font.toLowerCase()) ? this.specialArgs.font.toLowerCase() : "futura"
    };
  }

  static init() {
    super.init();
    this.flags.push({
      name: "noegg",
      description: "Disable... something. Not saying what it is though.",
      type: 5
    }, {
      name: "font",
      type: 3,
      choices: (() => {
        const array = [];
        for (const font of allowedFonts) {
          array.push({ name: font, value: font });
        }
        return array;
      })(),
      description: "Specify the font you want to use (default: futura)"
    });
    return this;
  }

  static description = "Adds a caption to an image";
  static aliases = ["gifc", "gcaption", "ifcaption", "ifunnycaption"];
  static arguments = ["[text]"];

  static requiresText = true;
  static noText = "You need to provide some text to add a caption!";
  static noImage = "You need to provide an image/GIF to add a caption!";
  static command = "caption";
}

export default CaptionCommand;
