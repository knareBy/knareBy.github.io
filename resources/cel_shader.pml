cmd.unset("specular") # reflections, off
cmd.set("ray_trace_gain", 0) # outline atoms with z, off
cmd.set("ray_trace_mode", 3) # outline, quantized color
cmd.set("ray_shadow", 0) # shadows, off
cmd.bg_color("white") # set background color to white
cmd.set("ray_trace_color", "black") # set outline color to black
cmd.set("depth_cue", 0) # disable the depth fog
