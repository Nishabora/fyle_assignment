const { Octokit, App } = require("octokit");
const { object } = require("webidl-conversions");
// const dotenv = require('dotenv');

// dotenv.config({path:"./config.env",debug:true});
const GIT_TOKEN = process.env.GIT_AUTH_TOKEN;
console.log(GIT_TOKEN);
const octokit = new Octokit({
    auth:GIT_TOKEN 
  });
exports.getHome = (req,res)=>{
    res.render('home');
}

exports.getUser = async (req,res,next)=>{
    res.render('userSearch');
}

exports.getOwnerRepos = async (req,res,next)=>{
    let owner = req.query.owner;
    let page_no = req.query.page*10;
    let inital_page;
    let final_page;
    let repo_data;
    if(req.query.page == 1)
    {
        inital_page =0;
        final_page = page_no;
    }
    else{
        inital_page =(req.query.page-1)*10;
        final_page = page_no;
    }
    console.log(owner);
    const user_data = await octokit.request(`GET /users/${owner}`, {
        username: owner,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
    
    console.log('User Data-');
    console.log(user_data);
    const result = await octokit.request(`GET /users/${owner}/repos`, {
        per_page:page_no,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
        });  
        console.log('Getting data-');
        console.log('Getting data-'+inital_page);
        console.log('Getting data-'+final_page);
        console.log(result);
        repo_data = result.data.slice(inital_page,final_page);
        // console.log(repo_data);
        for (repo in repo_data) {
            const topics = await octokit.request(`GET /repos/${owner}/${repo_data[repo].name}/topics`, {
                owner: owner,
                repo: repo_data[repo].name,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
                })
            
                console.log('Topics-');
                console.log(topics);
                res.render('home',{userName:owner,userURL:repo_data[0].owner.html_url,avatar_url:repo_data[0].owner.avatar_url,location:user_data.data.location,bio:user_data.data.bio,repos:repo_data,topics:topics,currentPage:req.query.page});
                return next();
        }
}   
