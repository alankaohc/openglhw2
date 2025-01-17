#pragma once
#include <string>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

class Shader {
public:
	Shader(const char* vetexPath, const char* fragmentPath);
	~Shader();
	std::string vertexString;
	std::string fragmentString;
	const char* vertexSource;
	const char* fragmentSource;
	unsigned int ID; // Shader Program ID

	enum Slot
	{
		DIFFUSE,
		SPECULAR
	};

	void use();
	void SetUniform3f(const char* paramNameString, glm::vec3 param);
	void SetUniform1f(const char* paramNameString, float param);
	void SetUniform1i(const char* paramNameString, int slot);
private:
	void checkCompileErrors(unsigned int ID, std::string type);
};

