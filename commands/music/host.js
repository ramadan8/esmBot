import { players } from "../../utils/soundplayer.js";
import MusicCommand from "../../classes/musicCommand.js";

class HostCommand extends MusicCommand {
  async run() {
    if (!this.channel.guild) return "This command only works in servers!";
    if (!this.member.voiceState.channelID) return "You need to be in a voice channel first!";
    if (!this.channel.guild.members.get(this.client.user.id).voiceState.channelID) return "I'm not in a voice channel!";
    if (this.connection.host !== this.author.id && this.author.id !== process.env.OWNER) return "Only the current voice session host can choose another host!";
    const input = this.type === "classic" ? this.args.join(" ") : this.options.user;
    if (!input || !input.trim()) return "You need to provide who you want the host to be!";
    let user;
    if (this.type === "classic") {
      const getUser = this.message.mentions.length >= 1 ? this.message.mentions[0] : (await this.ipc.fetchUser(input));
      if (getUser) {
        user = getUser;
      } else if (input.match(/^<?[@#]?[&!]?\d+>?$/) && input >= 21154535154122752n) {
        try {
          user = await this.client.getRESTUser(input);
        } catch {
          // no-op
        }
      } else {
        const userRegex = new RegExp(input.split(" ").join("|"), "i");
        const member = this.client.users.find(element => {
          return userRegex.test(element.username);
        });
        user = member;
      }
    } else {
      user = input;
    }
    if (!user) return "I can't find that user!";
    if (user.bot) return "Setting a bot as the session host isn't a very good idea.";
    const member = this.channel.guild ? this.channel.guild.members.get(user.id) : undefined;
    if (!member) return "That user isn't in this server!";
    const object = this.connection;
    object.host = member.id;
    players.set(this.channel.guild.id, object);
    return `🔊 ${member.mention} is the new voice channel host.`;
  }

  static flags = [{
    name: "user",
    type: 6,
    description: "The user you want the new host to be",
    required: true
  }];
  static description = "Changes the host of the current voice session";
  static aliases = ["sethost"];
}

export default HostCommand;
