$(document).ready(function(){
    $('#searchUser').on('keyup',function(e){
      let username = e.target.value; 
        
        // Making Request to Github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'e776a487742b8b24e0e8',
                client_secret:'b2a1de655a76eaa14562b60ce469480c16c3a08c',
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'e776a487742b8b24e0e8',
                    client_secret:'b2a1de655a76eaa14562b60ce469480c16c3a08c',
                    sort: 'created: asc',
                    per_page:5
            }
            }).done(function(repos){
              $.each(repos, function(index, repo){
                 $('#repos').append(`
                                    <div class="well">
                                        <div class="row">
                                            <div class="col-md-7">
                                            <strong>${repo.name}</strong>:${repo.description}
                                            </div>
                                            <div class="col-md-7">
                                                <span class="label label-default">Forks:${repo.forks_count}</span>
                                                <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                                <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                            </div>
                                            <div class="col-md-7">
                                            <a href="${repo.html_url}" traget="_blank" class="btn btn-default">Repo Page</a>
                                            </div>
                                        </div>
                                    </div>
                                    `); 
              });  
            });
            $('#profile').html(`
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${user.name}</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="thumbnail avatar" src="${user.avatar_url}">
                                <a traget ="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View User Profile</a>
                            </div>
                            <div class="col-md-9">
                            <ul class="list-group">
                                <li class="list-group-item">Public Repos : ${user.public_repos}</li>
                                <li class="list-group-item">Followers : ${user.followers}</li>
                                <li class="list-group-item">Following : ${user.following}</li>
                                <li class="list-group-item">Website / Blog : ${user.blog}</li>
                                <li class="list-group-item">Location : ${user.location}</li>
                                <li class="list-group-item">Member Since : ${user.created_at}</li>

                            </ul>
                            </div>
                        </div>    
                    </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });
    });
});