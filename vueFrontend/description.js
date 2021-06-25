/*
Vue that renders the the items more detailed infor, aswell as allows the user to like/unlike the item
*/
new Vue({ 
    el: '#ItemDesc',
    data() {
		return{ 
			username: "",
			img: "",
			type: "",
			product:"",
			price: 0,
			likes:0,
			description: "",
			likebool: null,
			
		}
	},
	/*
	This mounted has two parts that ideally I would've liked to split, the first part retrieves the item Description and Type from the server, as well as use the localstorage variables from the previous page to store the data.
	Secondly it asks the server if the user has already liked the given item based on the username and product_name, using this info, it will set the likedbool to true or false, and set the like button to like or unlike
	*/
	mounted (){
		axios
		.get("http://localhost:8081/GetProductDescType/?val=" + localStorage.id)
		.then(response => {
		console.log(JSON.stringify(response.data));  
		var temp = JSON.parse(JSON.stringify(response.data))
		console.log(temp[0].Description)
		this.description = temp[0].Description
		this.type = temp[0].Type
		console.log(this.description)
		});
		axios
		.get("http://localhost:8081/CheckLiked/?username=" + localStorage.username + "&product_name=" + localStorage.product)
		.then(response => {
		var temp = JSON.parse(JSON.stringify(response.data))
		console.log(temp[0].liked)	
		if(temp[0].liked == 0)
		{
			//I know this is insecure way to set html vals, in the future I'd change this to prevent XSS attacks
			document.getElementById("likebutton").innerHTML = "like";
			this.likebool = false			
		}
		else
		{
			this.likebool = true
			
			document.getElementById("likebutton").innerHTML = "unlike"; 
		}	
		});
		this.product = localStorage.product
		this.price = localStorage.price
		this.likes = localStorage.likes
		this.img = localStorage.url
		this.username = localStorage.username
	 
		
},
	methods:
	{
		/*
		Method that goes back to the product page, called by the back button
		*/
		"GoBack": function GoBack() {
		window.location.href = 'pokeproduct.html'
		},
		/*
		Method that increments the likes variable locally, changes the value of the like button, changes likebool, and posts to the server to modify the databases likes 
		*/	
		"Like": function Like() {
			if(this.likebool == true)
			{
				document.getElementById("likebutton").innerHTML = "like";
				this.likebool = false
				this.likes--
			}
			else
			{
				document.getElementById("likebutton").innerHTML = "unlike";
				this.likebool = true
				this.likes++
			}
			
			const data = {data:{username:this.username,product_name:this.product}};
			const url = "http://localhost:8081/like"
			console.log(data)
			axios.post(url,data)
		}
		
	}
});
	