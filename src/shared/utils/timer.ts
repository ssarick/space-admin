export default class TimerUtils {

  static async sleep(ms: number = 1000) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

}
