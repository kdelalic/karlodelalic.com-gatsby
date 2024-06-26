const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script key="0"
      dangerouslySetInnerHTML={{
        __html: `(function() {
            function setTheme(theme) {
              if (theme === 'dark') {
                document.documentElement.className = 'dark';
              } else {
                document.documentElement.className = '';
              }
              window.__theme = theme;
            };

            window.__setPreferredTheme = function(theme) {
              setTheme(theme);
              try {
                localStorage.setItem('preferred-theme', theme);
              } catch (e) {}
            };
          
            let preferredTheme;
            try {
              preferredTheme = localStorage.getItem('preferred-theme');
            } catch (e) {}

            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
          })();`.replace(/\n/g, ' ').replace(/ {2}/g, ''),
      }}
    />,
  ]);
};