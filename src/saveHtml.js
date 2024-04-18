import util from "util";
import { execSync } from "child_process";

import URLS from "./urls.js";

(async () => {
  function download(url) {
    execSync(
      `cd ../html/ && wget --mirror --convert-links --adjust-extension --page-requisites --no-parent ${url}`
    );
  }

  for (let index = 0; index < URLS.length; index++) {
    download(URLS[index]);
  }
})();
