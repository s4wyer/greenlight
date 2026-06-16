// attempts to match obfuscated links like:
// item,taobao,com/item,htm?id=908269945041
// https://item. tao bao. com/item.htm ?id=908269945041

export const fixers = [
  {
    name: "taobao",
    regex:
      /(?:item[\W_]*)?tao[\W_]*bao[\W_]*com[\W_]*item[\W_]*html?[\W_]*id[\W_]*(\d+)/gi,
    buildUrl: (match) => `https://item.taobao.com/item.htm?id=${match[1]}`,
  },
  {
    name: "weidan",
    regex:
      /wei[\W_]*dian[\W_]*com[\W_]*item[\W_]*html?[\W_]*(?:item[\W_]*)?id[\W_]*(\d+)/gi,
    buildUrl: (match) => `https://weidian.com/item.html?itemID=${match[1]}`,
  },
  {
    name: "1688",
    regex: /(?:detail[\W_]*)?1688[\W_]*com[\W_]*offer[\W_]*(\d+)/gi,
    buildUrl: (match) => `https://detail.1688.com/offer/${match[1]}`,
  },
];

export function extractAndFixLinks(text) {
  let hasChanges = false;
  let newText = text;

  for (const fixer of fixers) {
    const replacedText = newText.replace(fixer.regex, (...args) => {
      const match = args[0];
      const fixedUrl = fixer.buildUrl(args);
      if (match !== fixedUrl) {
        hasChanges = true;
      }
      return fixedUrl;
    });
    newText = replacedText;
  }

  return { hasChanges, newText };
}

export function fixRedditLinks(rootElement = document.body) {
  // we only really want to check Reddit because that's the only place links get obfuscated like this
  if (!window.location.hostname.includes("reddit.com")) {
    return;
  }

  const walker = document.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );

  const nodesToUpdate = [];
  let node;

  while ((node = walker.nextNode())) {
    const parentTag = node.parentNode
      ? node.parentNode.nodeName.toUpperCase()
      : "";
    if (["A", "SCRIPT", "STYLE", "TEXTAREA", "NOSCRIPT"].includes(parentTag)) {
      continue;
    }

    const { hasChanges, newText } = extractAndFixLinks(node.nodeValue);

    if (hasChanges) {
      nodesToUpdate.push({ node, newText });
    }
  }

  for (const { node, newText } of nodesToUpdate) {
    const span = document.createElement("span");

    span.innerHTML = newText.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1">$1</a>',
    );

    if (node.parentNode) {
      node.parentNode.replaceChild(span, node);
    }
  }
}
