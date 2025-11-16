import figlet from "figlet";
import gradient from "gradient-string";

export default function bigCliName() {
  return new Promise((resolve, reject) => {
    console.clear();
    const msg = "hCLI";

    figlet(msg, (err, data) => {
      if (err) reject(err);
      console.log(gradient.mind.multiline(data));
      resolve();
    });
  });
}