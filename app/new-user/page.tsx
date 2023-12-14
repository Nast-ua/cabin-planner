import { createNewUserFromAuth } from "@/utils/auth";

const NewUserPage = async () => {
  await createNewUserFromAuth();

  return <div />;
};

export default NewUserPage;
