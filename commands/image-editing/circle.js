const ImageCommand = require("../../classes/imageCommand.js");

class CircleCommand extends ImageCommand {
  static description = "Applies a radial blur effect on an image";
  static aliases = ["cblur", "radial", "radialblur"];

  static noImage = "you need to provide an image to add radial blur!";
  static command = "circle";
}

module.exports = CircleCommand;