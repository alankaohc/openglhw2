#version 330 core
out vec4 FragColor;
in vec2 TexCoords;

uniform sampler2D screenTexture;
uniform float barXL;
uniform float barXR;
uniform int shaderNow; 
uniform float curX;
uniform float curY;
uniform float time;

vec4 f() {
    return vec4(1.0,1.0,1.0,1.0);
}
void main()
{
    switch(shaderNow) {
        case 1:
            if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
                FragColor = vec4(1.0,1.0,1.0,1.0);
            } else if (gl_FragCoord.x < barXL){
                FragColor = texture(screenTexture, TexCoords);
            } else {
                FragColor = texture(screenTexture, TexCoords);
            }
            break;
        case 2:
            if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
                FragColor = vec4(1.0,1.0,1.0,1.0);
            } else if (gl_FragCoord.x < barXL){
                FragColor = texture(screenTexture, TexCoords);
            } else {
                FragColor = texture(screenTexture, TexCoords);
            }
            break;
        case 3:
            if ( pow(gl_FragCoord.x-curX, 2.0) + pow(gl_FragCoord.y-(600-curY), 2.0) < 6000) {
                float a = 0.5;
                float b = 1/a;
                FragColor = texture(screenTexture, (TexCoords + vec2(curX/800, (600-curY)/600)) * a);
            } else {
                FragColor = texture(screenTexture, TexCoords);
            }
            break;
        case 4:
            if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
                FragColor = vec4(1.0,1.0,1.0,1.0);
            } else if (gl_FragCoord.x < barXL){
                FragColor = texture(screenTexture, TexCoords);
            } else {
                vec4 color = texture(screenTexture, TexCoords);
                float gray = (color.r*0.299 + color.g*0.585 + color.b*0.144);
                FragColor = vec4(gray, gray, gray, 1);
            }

            break;
        case 5:
            if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
                FragColor = vec4(1.0,1.0,1.0,1.0);
            } else if (gl_FragCoord.x < barXL){
                FragColor = texture(screenTexture, TexCoords);
            } else {
                vec4 color = vec4(0,0,0,0);
                vec2 img_size = vec2(800, 600);
                int n = 0;
                int half_size = 3;
                for (int i = -half_size; i <= half_size; i++) {
                    for (int j = -half_size; j <= half_size; j++) {
                        vec4 c = texture(screenTexture, TexCoords + vec2(i,j)/img_size);
                        color += c;
                        n++;
                    }   
                }
                
                FragColor = color/n;
            }
            break;
        case 6:
            if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
                FragColor = vec4(1.0,1.0,1.0,1.0);
            } else if (gl_FragCoord.x < barXL){
                FragColor = texture(screenTexture, TexCoords);
            } else {
                float offset = time*1.5;
                float power1 = 0.03;
                float power2 = 3.5;
                float PI = 3.14159;
                float coordX = TexCoords.x*0.95 + power1 * sin(TexCoords.y * power2*PI+offset);
                float coordY = TexCoords.y;
                vec2 coord = vec2(coordX, coordY);
                FragColor = texture(screenTexture, coord);
            }
            break;
        case 7:
        
            //if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
            //    FragColor = vec4(1.0,1.0,1.0,1.0);
            //} else if (gl_FragCoord.x < barXL){
            //    FragColor = texture(screenTexture, TexCoords);
            //} else {
            //    int A[1200];
            //    for (int i=0; i<40; i++) 
            //        for (int j=0; j<30; j++)
            //            A[i*30+j] = 0;
            //    for (int i=0; i<40; i++) {
            //        for (int j=0; j<30; j++) {
            //            if (mod(floor(TexCoords.x*800), 20) == i && mod(floor(TexCoords.y*600), 20) == j) {
            //                A[i*30+j] += texture(screenTexture, TexCoords);
            //        }
            //    }
            //    if (mod(floor(TexCoords.x*800), 20) ==  )
            //}
           
            
            if (gl_FragCoord.x > barXL && gl_FragCoord.x < barXR) {
                FragColor = vec4(1.0,1.0,1.0,1.0);
            } else if (gl_FragCoord.x < barXL){
                FragColor = texture(screenTexture, TexCoords);
            } else {
                float dx = 10.0 * (1.0 / 800);
                float dy = 10.0 * (1.0 / 600);
                vec2 Coord = vec2(dx * floor(TexCoords.x / dx),
                                  dy * floor(TexCoords.y / dy));
                FragColor = texture(screenTexture, Coord);
                //FragColor = f();

            }
            break;
        case 8:
            
            
            break;
    }
    
   
} 