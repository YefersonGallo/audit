const linksCtrl = {};

const pool = require('../database');
const log4js = require("log4js");
const logger = log4js.getLogger("data");

linksCtrl.renderAddLink = (req, res) => {
    res.render('links/add');
};

linksCtrl.addLink = async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
     
    let name = await pool.query('Select users.username FROM users where users.id=?' , newLink.user_id);
    console.log("Link creado por usuario \"" + name[0].username + "\" desde la IP \""+req.ip+"\""); //----------------------
    logger.info("Link creado por usuario \"" + name[0].username + "\" desde la IP \""+req.ip+"\"");
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
}

linksCtrl.renderLinks = async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
}

linksCtrl.deleteLink = async (req, res) => {
    const { id } = req.params;
    let name = await pool.query('Select users.username FROM users, links where links.id = ? and links.user_id = users.id'  , [id]);
    console.log("Link con ID \" "+ [id] + " \" borrado por usuario \"" + name[0].username + "\"" + "con IP " + req.ip); //---------------------------------------
    logger.info("Link con ID \" "+ [id] + " \" borrado por usuario \"" + name[0].username + "\"" + "con IP " + req.ip);
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);    
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
};

linksCtrl.renderEditLink = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
};

linksCtrl.editLink = async (req,res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);

    let name = await pool.query('Select users.username FROM users, links where links.id = ? and links.user_id = users.id'  , [id]);
    console.log("Link con ID \""+ [id] + "\" ha sido editado por usuario: \"" + name[0].username+"\"" + "con la IP" + req.ip); //----------------------
    logger.info("Link con ID \""+ [id] + "\" ha sido editado por usuario: \"" + name[0].username+"\"" + "con la IP" + req.ip);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
}

module.exports = linksCtrl;