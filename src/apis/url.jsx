let baseUrl = "http://localhost:3100/"
let SocketIoUrl = "http://localhost:3000/"
let url = {
    register : baseUrl + "auth/register",
    login : baseUrl + "auth/login",

    user : baseUrl + "user/userDetails",
    alluser : baseUrl + "user/find/allUsers",
    userUpdate : baseUrl + "user/updateProfile",
    profile : baseUrl + "user/",
    myProfile : baseUrl + "user/",

    getFollowing: baseUrl + "user/getFollowing",
    getFollower: baseUrl + "user/getFollers",
    follow: baseUrl + "user/followUser",
    unfollow: baseUrl + "user/unFollowUser",

    mypost : baseUrl + "post/myPost",
    delete : baseUrl + "post/delete",
    uploadNewPost : baseUrl + "post/newPost",
    fetchAllPost : baseUrl + "post/allpost",

    likePost : baseUrl + "post/like",
    dislikePost : baseUrl + "post/dislike",
    savePost : baseUrl + "post/save",
    savedPosts : baseUrl + "post/savedPost",
    comment : baseUrl + "post/comment",
    unsavePost : baseUrl + "post/unsave",
    
    cloudinaryImageUpload : "https://api.cloudinary.com/v1_1/krnblog05-insta/image/upload",
    chat_url:SocketIoUrl,
    chat_getConversation: SocketIoUrl + "myConversation/",
    chat_getMsg: SocketIoUrl + "msg/getmsg/",
    chat_postMsg: SocketIoUrl + "msg/postmsg",
    chat_addConversation: SocketIoUrl + "addConversation",


}
export default url;