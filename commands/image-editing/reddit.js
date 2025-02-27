import ImageCommand from "../../classes/imageCommand.js";
import { random } from "../../utils/misc.js";
const names = ["esmBot", "me_irl", "dankmemes", "hmmm", "gaming", "wholesome", "chonkers", "memes", "funny", "pcmasterrace", "thomastheplankengine"];

class RedditCommand extends ImageCommand {
  params(url) {
    const newArgs = this.type === "classic" ? this.args.filter(item => !item.includes(url)).join(" ") : this.options.text;
    return {
      caption: newArgs && newArgs.trim() ? newArgs.replaceAll("\n", "").replaceAll(" ", "") : random(names)
    };
  }

  static description = "Adds a Reddit watermark to an image";
  static arguments = ["{text}"];

  static noText = "You need to provide some text to add a Reddit watermark!";
  static command = "reddit";
}

export default RedditCommand;
