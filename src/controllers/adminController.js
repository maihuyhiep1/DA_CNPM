const User = require('../models/index').User;

// Controller method to assign a user as a moderator
const assignModerator = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.role = 'moderator';
        await user.save();
        res.status(200).json({ success: true, message: 'User assigned as moderator successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

// Controller method to remove a moderator role from a user
const removeModerator = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.role = 'user';
        await user.save();
        res.status(200).json({ success: true, message: 'Moderator role removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

// Controller method to get all moderators
const getAllModerators = async (req, res) => {
    try {
        const moderators = await User.findAll({ where: { role: 'moderator' } });
        res.status(200).json({ success: true, moderators });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

module.exports = {
    assignModerator,
    removeModerator,
    getAllModerators,
};
