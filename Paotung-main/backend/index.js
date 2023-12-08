const http = require("http");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { db } = require("./db.js");
const admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;

var app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true, // this is the key part, it allows cookies to be sent with requests
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable this if you run behind a proxy (e.g. nginx)
app.set("trust proxy", 1);

app.use(
  session({
    secret: "secret$%^134",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 600000000, // session max age in miliseconds
    },
  })
);

app.get("/", async (req, res) => {
  if (req.session.login == true) {
    const cusRef = db.collection("customers");
    const snapshot = await cusRef
      .where("email", "==", req.session.email)
      .where("password", "==", req.session.password)
      .get();
    let goingsend = {};
    await snapshot.forEach((doc) => {
      goingsend = {
        id: doc.data().id,
        email: doc.data().email,
        firstName: doc.data().firstName,
        token: doc.data().token,
        menu_hist: doc.data().menu_hist,
      };
    });
    res.send({ status: true, value: goingsend });
  } else {
    res.send({ status: false });
  }
});

app.get("/restaurants", async (req, res) => {
  const citiesRef = db.collection("restaurants");
  const snapshot = await citiesRef.get();
  const arr = [];
  await snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    arr.push(doc.data());
  });
  res.send(arr);
});
app.get('/logout',(req,res)=>{
  console.log(req.session);
  console.log(req.session.destroy())
  res.send(200)
})
app.post("/menus", async (req, res) => {
  const citiesRef = db.collection("restaurants");
  const target = await req.body.restaurant_name;
  console.log(target);
  const snapshot = await citiesRef.where("restaurant_name", "==", target).get();
  const arr = [];
  await snapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  console.log(arr[0]);
  await res.send(arr[0]);
});
app.get("/home", (req, res) => {
  console.log(req.session);
});
app.post("/signup", (req, res) => {
  const dat = req.body.value;
  console.log(dat);
  res.send(200);
  const cusRef = db.collection("customers");

  cusRef.doc(dat.email).set({
    email: dat.email,
    password: dat.password,
    firstName: dat.firstName,
    familyName: dat.familyName,
    token: dat.token,
    id: dat.id,
    menu_hist: [],
  });
});
app.post("/login", async (req, res) => {
  const cusRef = db.collection("customers");
  const snapshot = await cusRef
    .where("email", "==", req.body.email)
    .where("password", "==", req.body.password)
    .get();

  if (snapshot.empty) {
    res.send(400);
  } else {
    snapshot.forEach((doc) => {
      req.session.email = doc.data().email;
      req.session.password = doc.data().password;
      req.session.id = doc.data().id;
      req.session.login = true;
    });
    res.send({ username: req.session.email, login_status: true });
  }
});

app.post("/history", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const restaurant_name = req.body.restaurant_name;
  const menu_name = req.body.menu_name;
  const totalPrice = req.body.totalPrice;
  const time = req.body.time;
  const cusRef = db.collection("customers").doc(email);
  const unionRes = await cusRef.update({
    menu_hist: FieldValue.arrayUnion({
      restaurant_name: restaurant_name,
      menu_name: menu_name,
      totalPrice: totalPrice,
      time: time,
    }),
  });
});

app.listen(5050, () => {
  console.log("server has started");
});
