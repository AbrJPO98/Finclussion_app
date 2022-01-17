const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        data: {
            title: 'Ruta protegida',
            user: req.user
        }
    })
})

module.exports = router;