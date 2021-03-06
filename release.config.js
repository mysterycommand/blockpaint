module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        message: `\
[<%= nextRelease.version %>]\
(https://github.com/mysterycommand/blockpaint/tree/<%= nextRelease.version%>)\
- <%= new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})%> [skip ci]
<%=nextRelease.gitTag%>
<%=nextRelease.gitHead%>
<%=nextRelease.notes%>`,
      },
    ],
    '@semantic-release/github',
  ],
};
