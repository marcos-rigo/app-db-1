const {Router} = require('express');
const {getUsers, addUser, deleteUser, editUser} = require('../controllers/usersControllers');
const router = Router();

router.get('/:email?', getUsers);
router.post('/', addUser);
router.delete('/', deleteUser);
router.put('/', editUser);

module.exports = router;