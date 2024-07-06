function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco()

function loading(){
  document.addEventListener("DOMContentLoaded", function () {
      // GSAP Animation for loader entrance
      var tl = gsap.timeline();
      tl.from(".loader", {
        y: "-100%",
        duration: 0.7,
      });
      tl.from(".logo", {
        opacity: 0,
        duration: 0.6,
      });
      tl.from(".year", {
        opacity: 0,
        duration: 0.6,
        y: "100%",
        stagger: 0.1,
      });

      // Timer logic to increment the percentage
      let timerElement = document.querySelector(".timer");
      let percentage = 0;
      let interval = setInterval(function () {
        percentage += 2; // Increase by 2 every 0.1 second to reach 100% in 5 seconds
        if (percentage > 100) {
          percentage = 100;
          clearInterval(interval);
          // GSAP Animation for loader exit
          tl.to(".loader", {
            top: "100%",
            duration: 0.7,
            ease: "power1.in",
            onComplete: function () {
              document.querySelector(".loader").style.display = "none";

              var tl = gsap.timeline();
              tl.to(".logo", {
                color: "white",
                height: "8vw",
                width: " 8vw",
                top: "8%",
                duration: 0.8,
                delay: 0.4,
              });
              tl.to(".hotel-img", {
                    scale: "0.3",
                    borderRadius: "40%",
                    duration: 0.3,
                  });

              tl.to(".hotel-img", {
                scale: "1",
                borderRadius: "0%",
                duration: .7,
                delay:.2,
              });
              tl.to(".blink", {
                opacity: 1,
                duration: 0.1,
                ease: "power1.in",
                stagger: 0.05,
              });
            },
          });
        }
        timerElement.textContent = `${percentage}%`;
      }, 100); // Update every 0.1 second
    });

}
loading()

function page1() {
  const mobNo = document.querySelectorAll(".mob-no");
  mobNo.forEach((mobNo)=>{
// Create the info box div
const infoBox = document.createElement("div");
infoBox.className = "hidden absolute bg-black text-white w-32 rounded-md font-extralight border border-black p-2 text-xs";
infoBox.textContent = "Mon-Sat 10:00-19:00\nSunday - Closed";
mobNo.appendChild(infoBox);

mobNo.addEventListener("mouseenter", (e) => {
  infoBox.classList.remove("hidden");
  infoBox.style.left = `${e.offsetX + 10}px`; // Offset to avoid covering the cursor
  infoBox.style.top = `${e.offsetY + 10}px`;
});

mobNo.addEventListener("mousemove", (e) => {
  infoBox.style.left = `${e.offsetX + 10}px`;
  infoBox.style.top = `${e.offsetY + 10}px`;
});

mobNo.addEventListener("mouseleave", () => {
  infoBox.classList.add("hidden");
});
  })
  
  const locate = document.querySelectorAll(".locate");

  // Create the info box div
  locate.forEach((locate)=>{
    const locBox = document.createElement("div");
    locBox.className = "hidden absolute bg-black rounded-md p-1 w-32";
  
    // Set the inner HTML content
    locBox.innerHTML = `
        <div class="h-32 rounded-md w-full overflow-hidden bg-red-600">
          <img class="h-full w-full object-cover" src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="">
        </div>
        <p class="text-xs text-white my-1 tracking-tighter font-extralight">53 Zambryaniska street, Lviv, Lviv, Oblast 47009</p>
        <p class="text-sm tracking-tighter my-1 font-extralight text-zinc-400">open on map</p>
      `;
  
    locate.appendChild(locBox);
  
    locate.addEventListener("mouseenter", (e) => {
      locBox.classList.remove("hidden");
      locBox.style.left = `${e.offsetX - locBox.offsetWidth - 10}px`; // Place the box to the left of the cursor
      locBox.style.top = `${e.offsetY}px`;
    });
  
    locate.addEventListener("mousemove", (e) => {
      locBox.style.left = `${e.offsetX - locBox.offsetWidth - 10}px`; // Update the left position to follow the cursor
      locBox.style.top = `${e.offsetY - 120}px`;
    });
  
    locate.addEventListener("mouseleave", () => {
      locBox.classList.add("hidden");
    });
  
  })
  
}
page1()

function section() {
  gsap.to(".page1 .overlay", {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page1",
      start: "top 0%",
      end: "top -40%",
      scrub: true,
    }
  })
  gsap.from(".page2 .overlay", {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2",
      start: "top 90%",
      end: "top 30%",
      scrub: true,
    }
  })
  gsap.from(".page3 .overlay", {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page3",
      start: "top 90%",
      end: "top 30%",
      scrub: true,
    }
  })
  gsap.from(".page4 .overlay", {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page4",
      start: "top 90%",
      end: "top 30%",  
      scrub: true,
    }
  })
  gsap.to(".page2 .overlay", {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2",
      start: "top 0%",
      end: "top -40%",
      scrub: true,
    }
  })
  gsap.to(".page3 .overlay", {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page3",
      start: "top 0%",
      end: "top -40%",
      scrub: true,
    }
  })
  gsap.to(".page4 .overlay", {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page4",
      start: "top 0%",
      end: "top -40%",
      
      scrub: true,
      onComplete: () => {
        alert("hlw")
      }
    }
  })



  gsap.to(".page1", {
    height: "0vh",
    scrollTrigger: {
      trigger: ".page1",
      start: "top -10%",
      // end: "bottom top",
      scrub: true,
    }
  });

  // Animate other pages if needed
  gsap.to(".page2", {
    height: "0vh",
    scrollTrigger: {
      trigger: ".page2",
      start: "top -10%",
      scrub: true,
      
    }
  });

  gsap.to(".page3", {
    height: "0vh",
    scrollTrigger: {
      trigger: ".page3",
      start: "top -10%",
      scrub: true,
  
    }
  });

  gsap.to(".page4", {
    height: "0vh",
    scrollTrigger: {
      trigger: ".page4",
      start: "top -10%",
      scrub: true,
    }
  });

}
section()

function prevnext() {
  document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelectorAll('#image-container');
    container.forEach(container => {


      const images = container.querySelectorAll('img');
      const totalImages = images.length;
      let currentIndex = 0;

      document.querySelectorAll(".next-arrow").forEach(nextArrow => {
        nextArrow.addEventListener("click", () => {
          images.forEach((img, index) => {
            gsap.to(img, {
              x: `-=${100}%`, // Move the image to the left by 100% of its width
              duration: 1, // Duration of the animation in seconds
              onComplete: () => {
                // Check if the image has moved out of view
                if (parseFloat(img.style.transform.split('(')[1]) <= -100 * totalImages) {
                  // Reset position to the right of the last image
                  gsap.set(img, { x: `${100 * (totalImages - 1)}%` });
                }
              }
            });
          });

          // Update currentIndex for tracking the current image index
          currentIndex = (currentIndex + 1) % totalImages;
        });
      });

      document.querySelectorAll(".prev-arrow").forEach(prevArrow => {
        prevArrow.addEventListener("click", () => {
          images.forEach((img, index) => {
            gsap.to(img, {
              x: `+=${100}%`, // Move the image to the right by 100% of its width
              duration: 1, // Duration of the animation in seconds
              onComplete: () => {
                // Check if the image has moved out of view
                if (parseFloat(img.style.transform.split('(')[1]) >= 100 * totalImages) {
                  // Reset position to the left of the first image
                  gsap.set(img, { x: `-${100 * (totalImages - 1)}%` });
                }
              }
            });
          });

          // Update currentIndex for tracking the current image index
          currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        });
      });

    })
  });






}
prevnext()



function page5() {
  document.addEventListener('DOMContentLoaded', function () {
    const textContainers = document.querySelectorAll('.page5 h1');

    textContainers.forEach(container => {
      const text = container.innerText;
      container.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'letter';
        if (char === ' ') {
          span.style.display = 'inline-block';
          span.style.width = '0.5em'; // Adjust the width as needed
        }
        span.innerText = char;
        container.appendChild(span);
      });
    });

    const letters = document.querySelectorAll('.letter');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          letters.forEach((letter, index) => {
            setTimeout(() => {
              letter.classList.add('show');
            }, index * 100); // Adjust the delay for staggered effect
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(document.querySelector('.page5'));

    document.addEventListener('mousemove', function (e) {
      letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const distance = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
        if (distance < 10 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
          letter.style.fontWeight = '700';
        } else {
          letter.style.fontWeight = '100';
        }
      });
    });
  });

}
page5()


function insta() {
  const instaDiv = document.querySelectorAll('.scanner');
  instaDiv.forEach(instaDiv => {
    // Create the floating div
    const floatingDiv = document.createElement('div');
    floatingDiv.className = 'absolute h-60 w-40 bg-black rounded-md p-1 hidden flex-col justify-between gap-4';
    floatingDiv.innerHTML = `
      <div class="h-[90%] rounded-md bg-red-500 w-full">
          <video class="h-full w-full object-cover" autoplay muted loop src="https://s3.amazonaws.com/webflow-prod-assets/6613fb0aff6a7761bf9a817d/663bcfe77765a0f1702b036f_insta-3.mp4"></video>
      </div>
      <div class="flex my-1 items-center gap-2 px-1 w-full">
          <div class="h-5 w-5 bg-white flex items-center justify-center rounded-full"></div>
          <p class="text-white text-sm font-light">velours_horeca</p>
      </div>
  `;
    instaDiv.appendChild(floatingDiv);

    instaDiv.addEventListener('mouseenter', function () {
      floatingDiv.classList.remove('hidden');
    });

    instaDiv.addEventListener('mouseleave', function () {
      floatingDiv.classList.add('hidden');
    });

    instaDiv.addEventListener('mousemove', function (e) {
      const rect = instaDiv.getBoundingClientRect();
      const x = e.clientX - rect.left + 30; // 20 pixels to the right of the mouse cursor
      const y = e.clientY - rect.top - 100;  // 20 pixels below the mouse cursor

      floatingDiv.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

}
insta()


function blurText() {
  const textContainers = document.querySelectorAll('.page6 h1');

  textContainers.forEach(container => {
    const text = container.innerText;
    container.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'blur-letter';
      if (char === ' ') {
        span.style.display = 'inline-block';
        span.style.width = '0.5em'; // Adjust the width as needed
      }
      span.innerText = char;
      container.appendChild(span);
    });
  });
  gsap.from(".blur-text h1 .blur-letter", {
    filter: "blur(10px)",
    stagger: {
      from: "center",
      each: 0.05,
    },
    duration: 1, // Adjust the duration as needed
    ease: "power2.inOut",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page6",
      start: "top 70%",
      end: "top 30%",
      scrub: true,
       // For debugging, can be removed
    },
    onComplete: () => {
      gsap.to(".blur-text h1 .blur-letter", {
        filter: "blur(0px)",
        stagger: {
          from: "end",
          each: 0.05,
        },
        duration: 1, // Adjust the duration as needed
        ease: "power2.inOut"
      });
    }
  });



  // page9

}
blurText()
function page9(){
  const textContainers = document.querySelectorAll('.page9 h1');

  textContainers.forEach(container => {
    const text = container.innerText;
    container.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'blur-letter';
      if (char === ' ') {
        span.style.display = 'inline-block';
        span.style.width = '0.5em'; // Adjust the width as needed
      }
      span.innerText = char;
      container.appendChild(span);
    });
  });
  gsap.from(".blur-text h1 .blur-letter", {
    filter: "blur(10px)",
    stagger: {
      from: "center",
      each: 0.05,
    },
    duration: 1, // Adjust the duration as needed
    ease: "power2.inOut",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page9",
      start: "top 80%",
      end: "top 40%",
      scrub: true,
       // For debugging, can be removed
    },
    onComplete: () => {
      gsap.to(".blur-text h1 .blur-letter", {
        filter: "blur(0px)",
        stagger: {
          from: "center",
          each: 0.05,
        },
        duration: 1, // Adjust the duration as needed
        ease: "power2.inOut"
      });
    }
  });
  
  
}
page9()
function page11(){
  const textContainers = document.querySelectorAll('.page11 h1');

  textContainers.forEach(container => {
    const text = container.innerText;
    container.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'blur-letter';
      if (char === ' ') {
        span.style.display = 'inline-block';
        span.style.width = '0.5em'; // Adjust the width as needed
      }
      span.innerText = char;
      container.appendChild(span);
    });
  });
  gsap.from(".blur-text h1 .blur-letter", {
    filter: "blur(10px)",
    stagger: {
      from: "center",
      each: 0.05,
    },
    duration: 1, // Adjust the duration as needed
    ease: "power2.inOut",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page11",
      start: "top 70%",
      end: "top 30%",
      scrub: true,
       // For debugging, can be removed
    },
    onComplete: () => {
      gsap.to(".blur-text h1 .blur-letter", {
        filter: "blur(0px)",
        stagger: {
          from: "center",
          each: 0.05,
        },
        duration: 1, // Adjust the duration as needed
        ease: "power2.inOut"
      });
    }
  });



}
page11()



function rotatediv(){
  gsap.from(".page7 .rotating-text", {
    transform: "rotatez(-120deg)",
    transform: "rotatey(60deg)",
    // transform:"rotatex(60deg)",
    filter: "blur(10px)",
    stagger: {
      from: "start",
      each: 0.1,
    },
    scrollTrigger: {
      scroller: ".main",
      trigger: ".rotatediv",
      scrub: true,
      start: "top 80%",
      end: "top 0%",
    }
  })
  gsap.to(".page7 .rotating-text", {
    transform: "rotatez(120deg)",
    transform: "rotatey(45deg)",
    // transform:"rotatex(60deg)",
    filter: "blur(10px)",
    stagger: {
      from: "start",
      each: 0.25,
    },
    scrollTrigger: {
      scroller: ".main",
      trigger: ".rotatediv",
      scrub: true,
      start: "top 40%",
      end: "top -70%",
    }
  })


  // page12
  document.addEventListener('DOMContentLoaded', function() {
  gsap.from(".page12 .rotating-text", {
    transform: "rotatez(-120deg)",
    transform: "rotatey(60deg)",
    // transform:"rotatex(60deg)",
    filter: "blur(10px)",
    stagger: {
      from: "start",
      each: 0.1,
    },
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page12 .rotatediv",
      scrub: true,
      start: "top 80%",
      end: "top 0%",
    }
  })
  gsap.to(".page12 .rotating-text", {
    transform: "rotatez(120deg)",
    transform: "rotatey(45deg)",
    // transform:"rotatex(60deg)",
    filter: "blur(10px)",
    stagger: {
      from: "start",
      each: 0.25,
    },
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page12 .rotatediv",
      scrub: true,
      start: "top 40%",
      end: "top -70%",
    }
  })
});



  
  
}
rotatediv()


function footer(){
  const numberElement = document.querySelector('.warnyear');

  gsap.to(numberElement, {
    textContent: 0,
    duration: 10,
    ease: "none",
    snap: { textContent: 1 },
    repeat: -1,
    yoyo: true,
    onUpdate: function () {
      numberElement.textContent = Math.round(numberElement.textContent);
    }
  });
  
  
  // Pin the image div when it comes to the top 50%
  gsap.to(".image-div", {
    scrollTrigger: {
      trigger: ".image-div",
      start: "top 30%",
      scroller: ".main",
      end: ".page13 top -70%",
      pin: true,
      pinSpacing: false
    }
  });
  
  // Animate opacity of h1 elements and change the image
  // Animate opacity of h1 elements and change the image
  document.querySelectorAll('.page13 h1').forEach((h1, index) => {
    gsap.to(h1, {
      opacity:"1",
      scrollTrigger: {
        trigger: h1,
        start: "top 60%",
        scroller: ".main",
        scrub: true,
        end: "top 52%",
        onEnter: () => {
          // Change opacity to 1
          gsap.to(h1, { opacity: 1, duration: 0.5 });
  
          // Hide all images
          document.querySelectorAll('.image-div img').forEach(img => img.classList.remove('active'));
  
          // Show the corresponding image
          const imageId = h1.getAttribute('data-image-id');
          document.getElementById(imageId).classList.add('active');
        },
        onLeave: () => {
          // Reset opacity to 0.7
          gsap.to(h1, { opacity: 0.7, duration: 0.5 });
  
          // Hide the corresponding image
          const imageId = h1.getAttribute('data-image-id');
          document.getElementById(imageId).classList.remove('active');
  
          // Show default image if it's the last h1
          if (index === document.querySelectorAll('.page13 h1').length - 1) {
            document.getElementById('default-image').classList.add('active');
          }
        },
        onLeaveBack: () => {
          // Reset opacity to 0.6
          gsap.to(h1, { opacity: 0.6, duration: 0.5 });
  
          // Hide all images
          document.querySelectorAll('.image-div img').forEach(img => img.classList.remove('active'));
  
          // Show the corresponding image
          const imageId = h1.getAttribute('data-image-id');
          document.getElementById(imageId).classList.add('active');
        }
      }
    });
  });
  
  // Show the default image when no h1 is active
  ScrollTrigger.create({
    trigger: '.page13',
    start: 'bottom bottom',
    scroller: ".main",
    onEnterBack: () => {
      // Hide all images
      document.querySelectorAll('.image-div img').forEach(img => img.classList.remove('active'));
      
      // Show the default image
      document.getElementById('default-image').classList.add('active');
    },
    onLeave: () => {
      // Hide the default image
      document.getElementById('default-image').classList.remove('active');
    }
  });
  
  // Initially show the default image
  document.getElementById('default-image').classList.add('active');
  
  
  
  gsap.from(".zoom",{
    scale:2,
    scrollTrigger:{
      scroller:".main",
      trigger:".footer",
      start:"top 40%",
      end:"top -30%",
      scrub:true,
    }
  })
}
footer()


