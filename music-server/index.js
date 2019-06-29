const express = require("express");
const axios = require("axios");

const app = new express();

app.get("/search", (req, res) => {
  const url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";
  axios
    .get(url, {
      headers: {
        referer: "https://y.qq.com/",
        Origin: "https://y.qq.com"
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.log(e);
    });
});
app.get("/getTopList", (req, res) => {
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
  axios
    .get(url, {
      headers: {
        referer: "https://y.qq.com/",
        Origin: "https://y.qq.com"
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.log(e);
    });
});
app.get("/getSongList", (req, res) => {
  const url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
  axios
    .get(url, {
      headers: {
        referer: "https://c.y.qq.com/",
        host: "c.y.qq.com"
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.log(e);
    });
});
app.get("/lyric", (req, res) => {
  const url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
  axios
    .get(url, {
      headers: {
        referer: "https://c.qq.com/",
        origin: "https://c.qq.com"
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.log(e);
    });
});
app.get("/getDiskList", (req, res) => {
  const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
  axios
    .get(url, {
      headers: {
        referer: "https://c.y.qq.com",
        host: "c.y.qq.com"
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
})
