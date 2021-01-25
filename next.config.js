module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/share",
        permanent: true,
      },
    ];
  },
};
