#version 330 core

//in vec4 vertexColor;
//in vec2 TexCoord;
in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoord;

struct Material {
    vec3 ambient;
    sampler2D diffuse;
    sampler2D specular;
    float shininess;
}; 
uniform Material material;

//uniform sampler2D ourTexture;
//uniform sampler2D ourFace;
uniform vec3 objColor;
uniform vec3 ambientColor;
uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 cameraPos;
uniform float barXL;
uniform float barXR;
uniform int shaderNow; 

out vec4 FragColor;

void main() {
   vec3 lightDir = normalize(lightPos - FragPos);
   vec3 reflectVec = reflect(-lightDir, Normal);
   vec3 cameraVec = normalize(cameraPos - FragPos);
   
   // specular 
   float specularAmout = pow( max( dot(reflectVec, cameraVec), 0), material.shininess);
   vec3 specular = texture( material.specular, TexCoord).rgb * specularAmout * lightColor;
   
   // diffuse
   vec3 diffuse = texture(material.diffuse, TexCoord).rgb * max( dot(lightDir, Normal), 0) * lightColor;
   //vec3 diffuse = texture(material.diffuse, TexCoord).rgb;

   // ambient
   vec3 ambient = texture(material.diffuse, TexCoord).rgb * ambientColor;

   if (shaderNow == 2) {
        if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
                FragColor = vec4(1.0,1.0,1.0,1.0);
            } else if (gl_FragCoord.x < barXL){
                FragColor = vec4( (ambient + diffuse + specular )*objColor, 1.0 ); 
            } else {
                FragColor = vec4( (ambient + diffuse + specular )*Normal, 1.0 ); 
            }
   } else {
        FragColor = vec4( (ambient + diffuse + specular )*objColor, 1.0 );
   }
}