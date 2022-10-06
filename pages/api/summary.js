export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        ok: false,
        message: "Permission denied",
      });
    }
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    //compute DB summary
    const userCount = user.length;
    const adminCount = [];
    adminCount.push(user.map((x) => x.isAdmin === true));
    const totalMoney = user.map((x, i) => x[i].money + x[i + 1].monet);

    //return response
    return res.json({
      ok: true,
      userCount: userCount,
      adminCount: adminCount.length,
      totalMoney: totalMoney,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
