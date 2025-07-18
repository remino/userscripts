//!HOOK LUMA
//!HOOK RGB
//!BIND HOOKED

// A single-pass hook shader: grab the pixel, convert to luma, spit it back out.
vec4 hook()
{
    // sample the current pixel
    vec4 c = HOOKED_texOff(0);
    // Rec.601 luma
    float y = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    // return greyed-out RGB with original alpha
    return vec4(vec3(y), c.a);
}
