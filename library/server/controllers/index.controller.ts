import { Get, NotFoundException } from "next-api-decorators";
import { Controller } from "../decorators";

@Controller()
class IndexController {
	@Get()
	public list() {
		throw new NotFoundException();
	}
}

export default IndexController;
