var currentForFilter = "All";
var currentCategoryFilter = "Trending";
var currentPriceFilter = 0;
var sliderContentElement;

$(document).ready(function() {
    sliderContentElement = document.getElementById("slider-content");
    populateImages();
    $(".person-category-list-item").click(filterByFor);
    $("#category-select").change(filterByCategory);
    $("#price-slider-input").change(filterByPrice);
    filter();
    $("#slider-arrow-button-right").click(scrollRight);
    $("#slider-arrow-button-left").click(scrollLeft);
});
function populateImages() {
    let contentHtml = ''
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let heightStyle = ""
        if (product.height == 2) 
         heightStyle = `style="flex: 50%;"`
        let imgDivHtml = `
        <a href="${product.productLink}" class="slider-content-img-div" ${heightStyle} data-category="${product.category}" data-for="${product.for}" data-price="${product.price}">
            <img src="images/products/${product.photoLink}" class="slider-content-img" />
            <span class="slider-content-img-brand">${product.brand}</span>
            <span class="slider-content-img-price">$${product.price}</span>
            <div class="slider-content-img-details-div">
            <div class="slider-content-img-details-img-wrap">
            <img src="images/products/${product.photoLink}" />
            <span class="slider-content-img-details-heading">${product.name}</span>
            <span class="slider-content-img-details-price">$${product.price}</span>
            </div>
            <div class="see-more-div">See more products <span class="see-more-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></span></div>
            </div>
        </a>
        `;
        contentHtml += imgDivHtml;
    }
    $("#slider-content").html(contentHtml);
}

function filterByFor(event) {
    let newForFilterId = event.currentTarget.id;
    if (newForFilterId !== currentForFilter) {
        $(".person-category-list-item").removeClass("active");
        $("#"+newForFilterId).addClass("active");
        currentForFilter = newForFilterId;
        filter();
    }
}

function filterByPrice(event) {
    let newPriceFilterValue = parseInt(event.currentTarget.value);
    if (newPriceFilterValue===0) newPriceFilterValue = 25;
    else if (newPriceFilterValue===1) newPriceFilterValue = 50;
    else if (newPriceFilterValue===2) newPriceFilterValue = 100;
    else if (newPriceFilterValue===3) newPriceFilterValue = 500;
    else if (newPriceFilterValue===4) newPriceFilterValue = 1000;
    console.log(newPriceFilterValue);
    if (newPriceFilterValue !== currentPriceFilter) {
        currentPriceFilter = newPriceFilterValue;
        filter();
    }
}

function filterByCategory() {
    let newCategoryFilterId = event.currentTarget.value;
    console.log(newCategoryFilterId);
    if (newCategoryFilterId !== currentCategoryFilter) {
        currentCategoryFilter = newCategoryFilterId;
        filter();
    }
}

function filter() {
    let visible = 0;
    var toFadeOut = [];
    var toFadeIn = [];
    $(".slider-content-img-div").each(function(){
        let itemForValue = $(this).attr("data-for");
        let itemPriceValue = parseInt($(this).attr("data-price"));
        let itemCategoryValue = $(this).attr("data-category");
        if (currentForFilter === "All") itemForValue = "All";
        // make the hidden image visible
        if ($(this).hasClass("hidden")) {
            if ((itemForValue === currentForFilter) && (itemPriceValue >= currentPriceFilter) && (itemCategoryValue === currentCategoryFilter)) {
                toFadeIn.push(this);
                visible++;
            }
        }
        else {
            visible++;
            // make the visible images hidden
            if ((itemForValue !== currentForFilter ) || (itemPriceValue < currentPriceFilter) || (itemCategoryValue !== currentCategoryFilter)) {
                toFadeOut.push(this);
                visible--;
            }
        }
    });
    for (let i of toFadeOut) {
        $(i).fadeOut();
        $(i).addClass("hidden");
    }
    setTimeout(function(){
        for (let i of toFadeIn) {
            $(i).fadeIn();
            $(i).removeClass("hidden");
        }
        showOrHideSliderButtons();
    },toFadeOut.length===0?0:800);
    
    console.log("total products visible: " + visible);
}
function showOrHideSliderButtons() {
    let sliderScrollWidth = sliderContentElement.scrollWidth;
    let sliderWidth = sliderContentElement.offsetWidth;
    console.log(sliderScrollWidth);
    console.log(sliderWidth);
    if (sliderWidth === sliderScrollWidth) {
        console.log("HDIDINDN");
        $(".slider-arrow-button").hide();
    }
    else {
        $(".slider-arrow-button").fadeIn();
    }
}

function scrollRight() {
    sliderContentElement.scrollBy({
        left: 500,
        behavior: 'smooth'
    })
}
function scrollLeft() {
    sliderContentElement.scrollBy({
        left: -500,
        behavior: 'smooth'
    })
}