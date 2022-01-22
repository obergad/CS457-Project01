#version 330 compatibility

in vec4  vColor;
in float vLightIntensity;
in vec2  vST;

uniform float uAd;
uniform float uBd;
uniform float uTol;
uniform vec4  uElipColor;


void
main( )
{
  float rA = uAd/2.;
	float rB = uBd/2.;

	float s = vST.s;
	float t = vST.t;
	int numins = int( s / uAd );
	int numint = int( t / uBd );

	gl_FragColor = vColor;		// default color


			float scenter = float(numins)*uAd + rA;
			float tcenter = float(numint)*uBd + rB;
      float d = pow((s-scenter)/rA, 2) + pow((t-tcenter)/rB, 2);
			float tt = smoothstep( 1-uTol, 1+uTol, d );
			gl_FragColor = mix( uElipColor, vColor, tt );


	gl_FragColor.rgb *= vLightIntensity;	// apply lighting model
}
