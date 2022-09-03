var count = sessionStorage.getItem("count");
var dataValue = sessionStorage.getItem("dataValue");

async function getPageData(dataValue) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&srwhat=text&origin=*&prop=revisions&titles=${dataValue}&formatversion=2&rvprop=content&rvslots=*`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

async function handleSubmit(event) {
  event.preventDefault();
  const searchResults = document.querySelector(".js-search-results");

  searchResults.innerHTML = "";

  try {
    const results = await getPageData(dataValue);
    displayResults(results);
  } catch (err) {
    console.log(err);
    alert("he he ha ha");
  }
}

function displayResults(results) {
  const searchResults = document.querySelector(".js-search-results");

  var filterStr = results.query.pages[0].revisions[0].slots.main.content;

  console.log(filterStr);

  filterStr = filterStr.match(/\[\[[^\]]*]]/g);
  let newstr1 = filterStr.toString().replace(/\[\[/g, " ");
  let newstr2 = newstr1.toString().replace(/\]\]/g, "\n");
  let newstr3 = newstr2.replace(/,/g, "");
  newstr3 = newstr3.toLowerCase();

  const words = newstr3.split("\n");
  let word = Array.from(words).sort();

  word = word.toString().replaceAll(",", "\n");
  searchResults.innerHTML = word;
}

window.addEventListener("load", (event) => {
  handleSubmit(event);
});
