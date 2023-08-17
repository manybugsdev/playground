export const thx = (h, isValidElement) => {
  function parseArgs(args) {
    if (args.length === 0) return { attrs: {}, children: [] };
    const tail = [...args];
    const head = tail.shift();
    if (isValidElement(head) || typeof head !== "object")
      return { attrs: {}, children: [head, ...tail] };
    return { attrs: head, children: tail };
  }
  return new Proxy(
    {},
    {
      get(origin, tag) {
        if (origin[tag])
          return (...args) => {
            const { attrs, children } = parseArgs(args);
            return h(origin[tag], attrs, ...children);
          };
        return (...args) => {
          const { attrs, children } = parseArgs(args);
          return h(tag, attrs, ...children);
        };
      },
      set(origin, tag, value) {
        origin[tag] = value;
        return true;
      },
    }
  );
};
