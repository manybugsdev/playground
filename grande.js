(() => {
  const t = new Proxy(
    {},
    {
      get(target, prop, receiver) {
        const el = document.createElement(prop);
        return (...args) => {
          const _args = args.flat().filter((a) => a);
          if (_args.length === 0) return el;
          const head = _args.shift();
          const [attrs, children] =
            head instanceof HTMLElement || typeof head !== "object"
              ? [{}, [head, ..._args]]
              : [head, _args];
          for (const key in attrs) {
            el.setAttribute(key, attrs[key]);
          }
          for (const child of children) {
            if (child instanceof HTMLElement) {
              el.appendChild(child);
              continue;
            }
            el.appendChild(document.createTextNode(`${child}`));
          }
          return el;
        };
      },
    }
  );

  const hooks = {
    useState: (initialValue) => {
      return [initialValue, () => {}];
    },
  };

  window.Grande = { t, hooks };
})();
