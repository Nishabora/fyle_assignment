function userSearch() 
{
    let user_name = document.getElementById('user-name').value;
    window.location.href=`/getOwnerRepos?owner=${user_name}&page=1`;
}