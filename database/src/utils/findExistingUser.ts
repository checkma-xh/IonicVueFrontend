import { UserInfo } from "../entity/UserInfo";

export async function findExistingUser(id: number = null, email: string = null, passwordHash: string = null): Promise<UserInfo | null> {
	if (id) {
		const userById = await this.UserInfoRepository.findOneBy({ id: id, activated: true });
		if (userById) {
			return userById;
		}
	} else if (email) {
		const queryBuilder = this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.email = :email AND user.activated = 1", { email });

		if (passwordHash) {
			queryBuilder.andWhere("user.passwordHash = :passwordHash", { passwordHash });
		}

		const userByEmail = await queryBuilder.getOne();
		return userByEmail;
	}
	return null;
}