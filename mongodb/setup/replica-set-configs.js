cfg = {
  _id: "rs0",
  members: [
    {
      _id: 0,
      host: "primary:27017",
      priority: 2,
    },
    {
      _id: 1,
      host: "secondary-1:27017",
      priority: 1,
    },
    {
      _id: 2,
      host: "secondary-2:27017",
      priority: 0,
    },
  ],
};

rs.initiate(cfg, { force: true });
rs.reconfig(cfg, { force: true });
rs.secondaryOk();
db.getMongo().setReadPref("nearest");
db.getMongo().setSecondaryOk();
