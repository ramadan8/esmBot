import MusicCommand from "../../classes/musicCommand.js";

class ToggleCommand extends MusicCommand {
  async run() {
    if (!this.channel.guild) return "This command only works in servers!";
    if (!this.member.voiceState.channelID) return "You need to be in a voice channel first!";
    if (!this.channel.guild.members.get(this.client.user.id).voiceState.channelID) return "I'm not in a voice channel!";
    if (this.connection.host !== this.author.id && !this.member.permissions.has("manageChannels")) return "Only the current voice session host can pause/resume the music!";
    const player = this.connection.player;
    await player.pause(!player.paused ? true : false);
    return `🔊 The player has been ${player.paused ? "paused" : "resumed"}.`;
  }

  static description = "Pauses/resumes the current song";
  static aliases = ["pause", "resume"];
}

export default ToggleCommand;
