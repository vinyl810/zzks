//KakaoLogin.vue

<template>
  <div>
    <button id="custom-login-btn" @click="kakaoLogin()">로그인</button>
    <button @click="kakaoLogout()">로그아웃</button>
  </div>
  <div>
    <button id="get-cookie" @click="getCookie()">get cookie</button>
  </div>
</template>

<script>
export default {
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_image, account_email, 	profile_nickname",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.profile.nickname;
          const email = kakao_account.email;
          console.log(kakao_account);
          console.log("nickname", nickname);
          console.log("email", email);

          const token = window.Kakao.Auth.getAccessToken();
          console.log(token);

          //로그인처리구현
          alert("로그인 성공!");
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((res) => {
        console.log(res);
        alert("로그아웃 성공!");
      });
    },
  },
  data() {
    return {};
  },
};
</script>
