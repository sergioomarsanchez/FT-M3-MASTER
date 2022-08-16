// const bodyParser = require("body-parser");
const e = require("express");
const express = require("express");
const { post } = require("superagent");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

const PATH = '/posts'


// TODO: your code to handle requests
server.post(PATH, (req, res)=>{
    
    let {author, title, contents} = req.body
    if(!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    } else {
        let newPost = {
            author,
            title,
            contents,
            id:id
        }
        posts.push(newPost)
        id++
        res.status(200).json(newPost)
    }
    
})
server.post(`${PATH}/author/:author`, (req, res)=>{
    let author = req.params.author
    let {title, contents} = req.body
    if(!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    } else {
        let newPost = {
            author,
            title,
            contents,
            id:id
        }
        posts.push(newPost)
        id++
        res.status(200).json(newPost)
    }
})

server.get(PATH, (req, res)=>{
let {term} = req.query
if(term){
   const term_posts = posts.filter(
       (p)=> p.title.includes(term) || p.contents.includes(term)
   );
   return res.json(term_posts)
} else res.json(posts)
})
server.get(`${PATH}/:author`, (req, res)=>{
    let author = req.params.author
    const term_posts = posts.filter((p)=> p.author=== author);
    if(term_posts.length === 0){
            res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post del autor indicado"})
        }else{
            return res.json(term_posts)
        }
})
server.get(`${PATH}/:author/:title`, (req, res)=>{
    let author = req.params.author
    let title = req.params.title

    const term_posts = posts.filter((p)=> p.author=== author && p.title === title);
    if(term_posts.length === 0){
            res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }else{
            return res.json(term_posts)
        }
})
server.put(PATH, (req, res)=>{
    
    let {id, title, contents} = req.body

    if(!id || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    } else {
        let post = posts.find(p=>p.id === id)
        if (post===undefined){
            return res
        .status(STATUS_USER_ERROR)
        .json({error: `El id${id} indicado no corresponde con un Post existente`})
        }else {
            post.title = title
            post.contents = contents
            return res.json(post)
        }
    }
   
})
server.delete(PATH, (req, res)=>{
    
    let {id} = req.body

    if(!id){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "Por favor, indicar el id a eliminar"})
    } else {
        let newPosts = posts.filter(p=>p.id !== id)
        if (posts.length===newPosts.length){
            return res
        .status(STATUS_USER_ERROR)
        .json({error: `El id${id} no corresponde con un Post existente`})
        }else {
           posts = newPosts
            return res.json({success : true })
        }
    }
})

server.delete(`/author`, (req, res)=>{
    
    let {author} = req.body
    const author_found = posts.find(p=>p.author===author)

    if(!author || !author_found){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe el autor indicado"})
    } 
    let delete_authors = [] 
    posts = posts.filter(p=> {
    if(p.author!==author){
        return true
    } else {
        delete_authors.push(p)
    }
})
return res.json(delete_authors)
})

module.exports = { posts, server };
