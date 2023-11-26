import express from "express";
import * as API from "../../Utilities/APIFeatures.js"
import { getUser , addUser} from "./usercontroller.js";
import fs from 'fs/promises'

export const getAllPages = async (req,res) => 
{
    try
    {
       const [rows,fields] = await (global.db).execute("select * from websites order by creation_date");
       //console.log(rows);
       res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
       })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

export const getOnePage = async (req,res) => 
{
    try
    {
       const id = (req.params.id).replace(":","")
       const [rows,fields] = await (global.db).query("select * from websites where id = ?", id);
       console.log(rows);
       res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
       })
    }
    catch(err)
    {
        res.status(401).json({
            status:"fail",
            message: err.message
        })
    }
}

//Aliases when refering to them do /searchby whatever you want and after it add ?(link|author|title)= string you want to add (space = %20, but users have -) 

export const getByAuthor = async (req,res) => 
{
    try
    {
        //console.log(req.query)
        const [rows,fields] = await (global.db).execute("SELECT * FROM `websites` WHERE `author_id` = (select id from users where login = ?) order by creation_date", [req.query.author]);
        res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
        })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

export const getByTitle = async (req,res) => 
{
    try
    {
        //console.log(req.query)
        const [rows,fields] = await (global.db).execute("SELECT * FROM `websites` WHERE title = ? order by creation_date", [req.query.title]);
        res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
        })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

export const getByLink = async (req,res) => 
{
    try
    {
        //console.log(req.query)
        const [rows,fields] = await (global.db).execute("SELECT * FROM `websites` WHERE link = ? order by creation_date", [req.query.link]);
        res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
        })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

export const addPage = async (req,res) => {
        try
        {
            if(req.session.user !== undefined)
            {
                const body = req.body;
                const plik =  req.file.buffer.toString('utf-8');
                const link = body.link;
                const tytul = body.tytul;
                const opis = body.opis;
                const user =  req.session.user.substr(-1);

                const [re] = await (global.db).query("INSERT INTO sites VALUES (NULL, ?, ?, ?, ?, ?);", [plik, link, tytul, opis, user]);
                res.redirect("/panel")
                return 0;
            }
            else{res.redirect('/');}
        }
        catch(err)
        {
            throw err; res.redirect('/login');
        }
}

export const deletePage = async (req,res) => 
{
    try
    {   
        if(req.session.user !== undefined)
        {
            const [re] = await (global.db).query("delete from sites where id = ?", [parseInt(req.body.id)]);
            res.redirect('/panel');
            return 0;
        }
        else{res.redirect('/');}
    }
    catch(err)
    {
        res.redirect('/login');
    }
}

export const updatePage = async (req,res) => 
{
    try
    {   
        if(req.session.user !== undefined)
        {
            const body = req.body;
            const icon = req.file.buffer.toString('utf-8');
            const link = body.link;
            const title = body.tytul;
            const dscription = body.opis;

            const [re] = await (global.db).query("update sites set icon = ?, link = ?, title = ?, description = ? where id = ?", [icon, link, title, dscription, parseInt(req.body.id)]);
            res.redirect('/panel');
            return 0;
        }
        else{res.redirect('/');}
    }
    catch(err)
    {
        res.redirect('/login');
    }
}