<template>

    <footer>
        <div class="footer">
            <div class="row " id="footer_1">
                <div class="col-4 mt-2">
                    <h6><b>VỀ CHÚNG TÔI</b></h6>
                    <p>
                        MC® – Share your color with the world
                    </p>
                    <br>
                    <span>
                        GPKD được cấp bởi Cục Cảnh sát QLHC & TTXH
                    </span>
                    <br>
                    <span>
                        Mã số thuế cá nhân: 8748861448-001
                    </span>
                    <br>
                    <span> Ngày cấp: 06/07/2021</span>
                    <br>
                    <span>Người đại diện: Mã Văn Chiều</span>
                </div>
                <div class="col-3 mt-2">
                    <H6><b>LIÊN HỆ</b></H6>
                    <span>Hotline</span>
                    </br>
                    <p><b>0388135076</b></p>
                    <span>Email</span>
                    </br>
                    <p><b>vanchieu.at3.st@gmail.com</b></p>
                    <span>
                        Cả tuần(Kể cả ngày nghĩ)
                    </span>
                    </br>
                    <p><b>9:00 - 22h00</b></p>
                </div>
                <div class="col-3 mt-2">
                    <H6><b>HỖ TRỢ</b></H6>
                    <p><router-link class="ht" :to="{ name: 'question' }"><span>Câu hỏi thường gặp</span></router-link>
                    </p>
                    <p><a href="#" style="text-decoration: none; color: black;"><span class="ht">Chính sách vận
                                chuyển</span></a></p>
                    <p><a href="#" style="text-decoration: none; color: black;"><span class="ht">Chính sách đổi
                                trả</span></a></p>
                    <p><a href="#" style="text-decoration: none; color: black;"><span class="ht">Chính sách hỗ
                                trợ</span></a></p>
                    <p><a href="#" style="text-decoration: none; color: black;"><span class="ht">Chính sách khiếu
                                nại</span></a></p>

                </div>
                <div class="col-2 mt-2">
                    <H6><b>MẠNG XÃ HỘI</b></H6>
                    <p>
                        <a href="https://www.facebook.com/profile.php?id=61550909348381" class="a icon_fb"><i
                                class="fa-brands fa-facebook fa-xl"></i></a>
                    </p>
                    <p>
                        <a href="" class="a2 icon_ytb"><i class=" fa-brands fa-youtube fa-xl"></i></a>
                    </p>
                    <p>
                        <a href="" class="a3 icon_ins"> <i class="fa-brands fa-instagram fa-xl"></i></a>
                    </p>
                </div>
            </div>
        </div>
        <div class="footer-content text-center">
            <span style=""><router-link class="router-link-footer" :to="{ name: 'privacyPolicy' }">Chính sách bảo
                    mật</router-link></span> | Điều khoản sử dụng | MC - SHOP UY TÍNH - CHẤT LƯỢNG
        </div>
    </footer>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);

}

#footer_1 {
    display: flex;
    font-family: 'Times New Roman', Times, serif;

}

.router-link-footer {
    color: rgb(255, 255, 255);
}

.router-link-footer:hover {
    color: white;
    font-weight: bold;
    text-decoration: none;
}

a {
    text-decoration: none;
}

.ht {
    color: black;
}

.ht:hover {
    color: black;
}

.ht:hover {
    text-decoration: none;
    color: black;
    font-weight: bold;
}

.a,
.a2,
.a3 {
    color: rgb(0, 0, 0);
}

.a:hover {
    color: blue;
}


.a2:hover {
    color: red;
}

.a3:hover {
    color: #FF1493;
}


.footer-content {
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    background-color: rgb(91, 91, 91);
    color: white;
    font-size: 14px;
}
</style>