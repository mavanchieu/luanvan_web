<template>
   
</template>

<script>
import UserService from '@/services/user.service';

    export default {
        components:{
            // SignupForm,
        },

        data(){
            return{
                user: {},
                message:"",
            }
        },

        methods: {
            async signup(data){
                try{
                    await UserService.create(data);
                    this.message = "Bạn đã đăng ký thành công, vui lòng đăng nhập để sử dụng";
                    if(this.message.length > 0){
                        confirm(this.message);
                        const router = useRouter();
          router.push({ name: 'login' });
                    }
                }catch(error){
                    console.log(error);
                }
            }
        },
    }

</script>

<style>
.tagname{
    font-family: serif;
    border-bottom: 2px solid black;
}
#content{
    height:550px;
}


h2{
    text-align: center;
}

h3{
    margin-top: 70px;
}

.button{
    border-radius: 20px;
    color: rgb(255, 255, 255);
    background-color: rgb(236, 92, 92);
    border: none;
}

.button:hover{
    background-color: rgb(165, 7, 7);
    color: white;
}



#content_left{
    background-image: linear-gradient(to right, rgba(255,0,50,50), rgb(17, 19, 16));
    text-align: center;
    align-content: center;
    color: white;
    border-radius:  20px 0px 0px 20px;
}

#content_right{
    border: 1px solid black;
    border-radius:  0px 20px 20px 0;
    box-shadow: 8px 8px black;
}

.mc{
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}</style>