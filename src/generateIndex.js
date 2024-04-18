import URLS from "./urls.js";
import fs from "fs";

const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>All Links</title>
  </head>
  <style>
  .popover::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  <body>{{body}}</body>
</html>
`;
function replaceUrl(url) {
  const newUrl = url.replace(
    "http://aspatricias.com.br/",
    "./aspatricias.com.br/"
  );
  return `${newUrl}index.html`;
}

function getSlug(url) {
  return url.split("/").at(-2);
}

function getContent(url) {
  const slug = getSlug(url);
  return fs.readFileSync(
    `../html/aspatricias.com.br/${slug}/index.html`,
    "utf8"
  );
}

function getPostTitle(url) {
  const content = getContent(url);
  const [_, title] = content.match(/<title>(.*?)<\/title>/);
  return title.replace("&#8211; AsPatrícias", "");
}

function getPostDate(url) {
  const content = getContent(url);
  const [_, date] = content.match(/<span class=\"post-date\">(.*?)<\/span>/);
  return date;
}

function run() {
  const body = URLS.map((url, index) => {
    const slug = getSlug(url);
    const newUrl = replaceUrl(url);
    const title = getPostTitle(url);
    const date = getPostDate(url);

    return `<tr>
      <td>
        ${date}
      </td>
      <td>  
        <a href="${newUrl}">${title}</a>
      </td>
      <td>  
        <button popovertarget="photo-${index}">Ver foto</button>
        <div popover class="popover" id="photo-${index}" style="overflow: auto; max-height: 90vh;">
        <a download="../photos/screenshot-${index}.png" href="../photos/screenshot-${index}.png">
          Download ⬇️
        </a>
        <hr/>
          <img loading="lazy" src="../photos/screenshot-${index}.png" width="1280" />
        </div>
      </td>
    </tr>
    `;
  });

  const html = template.replace("{{body}}", `<table>${body.join("")}</table>`);
  fs.writeFileSync("../html/index.html", html);
}

run();
