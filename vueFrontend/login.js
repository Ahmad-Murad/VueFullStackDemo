var test = new Vue({ 
    el: '#test',
    data:
	{
		userout: '',
		pswout: '',
		username: '',
		psw: '',
		
    },
	mounted() {
   
	},
	methods:
	{
		logOn: function(event)
		{
			test.userout = test.username
			test.pswout = test.psw
		}	
	}
	
});
