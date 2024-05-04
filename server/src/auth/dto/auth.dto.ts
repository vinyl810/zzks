// export class AuthPayloadDto {
//   username: string;

//   password: string;
// }

export class AuthPayloadDto {
  username: string;
  ktoken: string;
}

export class UserProfileDto {
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
  is_default_image: string;
  is_default_nickname: string;
}

export class UserProfileResponse {
  id: string;
  connected_at: string;
  kakao_account: {
    profile_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
      is_default_nickname: boolean;
    };
  };
}
