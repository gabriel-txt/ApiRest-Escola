class HomeController {
  async index(req, res) {
    res.json('Rota de Home');
  }
}

export default new HomeController();
