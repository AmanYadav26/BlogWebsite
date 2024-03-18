import { useState, useEffect } from "react";
const Usefetch = (url) => {
  const [Details, setDetails] = useState(null);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("jwtToken")
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var posts = JSON.parse(xhr.responseText);
      setDetails(posts);
    }
  };
  xhr.send();

  return Details;
};

export default Usefetch;
