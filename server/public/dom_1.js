function show() {
    let number = document.body.childNodes.length;
    for (let i = 0; i < number; i++) {
      let node = document.body.childNodes[i];
      alert("Node Name: " + node.nodeName
              + "\nType: " + node.nodeType
              + "\nValue: " + node.nodeValue
              + "\ninnerHTML: " + node.innerHTML
              + "\nouterHTML: " + node.outerHTML
              + "\ninnerText: " + node.innerText
              + "\nouterText: " + node.outerText
              + "\ntextContent: " + node.textContent
      );
    }
  }