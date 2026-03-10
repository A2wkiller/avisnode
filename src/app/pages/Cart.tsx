import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Gift,
  Lock,
  Sparkles,
  TrendingUp,
  Package,
  Zap,
  X,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { assets } from '../assets';

interface CartItem {
  id: string;
  name: string;
  price: string;
  gameId: string;
  icon?: string;
  quantity: number;
  features?: string[];
}

interface CouponCode {
  code: string;
  discount: number;
  description: string;
}

export default function ModernCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCouponList, setShowCouponList] = useState(false);

  // Available coupons
  const availableCoupons: CouponCode[] = [
    { code: 'WELCOME10', discount: 10, description: 'New customer discount' },
    { code: 'SUMMER25', discount: 25, description: 'Summer special' },
    { code: 'GAME50', discount: 50, description: 'Half-price gaming' },
  ];

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('avixnode_cart') || '[]');
    
    // Group items by name and add quantity
    const groupedCart = savedCart.reduce((acc: CartItem[], item: any) => {
      const existing = acc.find(i => i.name === item.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({
          ...item,
          quantity: 1,
          features: [
            'Instant Setup',
            'DDoS Protection',
            '99.9% Uptime',
            '24/7 Support'
          ]
        });
      }
      return acc;
    }, []);
    
    setCartItems(groupedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const expandedCart = cartItems.flatMap(item =>
      Array(item.quantity).fill({ ...item, quantity: 1 })
    );
    localStorage.setItem('avixnode_cart', JSON.stringify(expandedCart));
  }, [cartItems]);

  // Update quantity
  const updateQuantity = (itemId: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  // Apply coupon
  const applyCoupon = (code: string) => {
    const coupon = availableCoupons.find(c => c.code === code.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
      setShowCouponList(false);
      toast.success(`Coupon ${coupon.code} applied! ${coupon.discount}% off`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discountAmount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const total = subtotal - discountAmount;

  // Redirect to Paymenter
  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate brief processing before redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Redirecting to secure checkout...');
      
      // Redirect to the billing portal
      setTimeout(() => {
        localStorage.removeItem('avixnode_cart');
        window.location.href = 'https://billing.avixnode.in/';
      }, 800);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to proceed to checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-800">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Noise Texture */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
      }} />

      <div className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-6"
            >
              <ShoppingCart className="w-10 h-10 text-teal-500 dark:text-teal-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground via-teal-500 to-foreground bg-clip-text text-transparent transition-colors duration-800">
                Your Cart
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg transition-colors duration-800">
              {cartItems.length} {cartItems.length === 1 ? 'server' : 'servers'} ready to deploy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  // Empty Cart State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group"
                  >
                    <div className="relative rounded-3xl border border-border bg-card backdrop-blur-xl p-16 text-center overflow-hidden transition-colors duration-800">
                      <div className="relative z-10">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-teal-500/20 flex items-center justify-center"
                        >
                          <Package className="w-16 h-16 text-teal-500 dark:text-teal-400/50" />
                        </motion.div>
                        
                        <h3 className="text-3xl font-bold text-foreground mb-4 transition-colors duration-800">
                          Your cart is empty
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto transition-colors duration-800">
                          Looks like you haven't added any game servers yet.
                          Let's get you started with premium hosting!
                        </p>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate('/games')}
                          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all"
                        >
                          <Sparkles className="w-5 h-5" />
                          Browse Game Servers
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Cart Items List
                  cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, height: 0 }}
                      transition={{
                        delay: index * 0.05,
                        layout: { type: "spring", damping: 25 }
                      }}
                      className="relative group"
                    >
                      <div className="relative rounded-2xl border border-border bg-card backdrop-blur-xl overflow-hidden transition-colors duration-800">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        
                        <div className="relative z-10 p-6">
                          <div className="flex items-start gap-6">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-500/30 p-2 backdrop-blur-sm"
                            >
                              <img
                                src={item.icon || assets.imgMinecraft}
                                alt={item.name}
                                className="w-full h-full object-contain drop-shadow-lg"
                              />
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-bold text-foreground mb-1 transition-colors duration-800">
                                    {item.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm transition-colors duration-800">
                                    Game Server Hosting
                                  </p>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1, rotate: 90 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeItem(item.id)}
                                  className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center justify-center"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </motion.button>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.features?.slice(0, 3).map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-medium"
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-muted-foreground text-sm font-medium transition-colors duration-800">Quantity:</span>
                                  <div className="flex items-center gap-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="w-8 h-8 rounded-lg bg-foreground/5 border border-border text-foreground hover:bg-teal-500/20 hover:border-teal-500/30 transition-all flex items-center justify-center"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </motion.button>
                                    
                                    <motion.span
                                      key={item.quantity}
                                      initial={{ scale: 1.2, color: '#14b8a6' }}
                                      animate={{ scale: 1, color: 'currentColor' }}
                                      className="text-foreground font-bold text-lg min-w-[2rem] text-center transition-colors duration-800"
                                    >
                                      {item.quantity}
                                    </motion.span>
                                    
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="w-8 h-8 rounded-lg bg-foreground/5 border border-border text-foreground hover:bg-teal-500/20 hover:border-teal-500/30 transition-all flex items-center justify-center"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text">
                                    ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toFixed(2)}
                                  </div>
                                  <div className="text-muted-foreground text-sm transition-colors duration-800">
                                    ₹{item.price.replace('₹', '')} × {item.quantity}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

              {/* Recommended Addons */}
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl p-6 transition-colors duration-800"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground transition-colors duration-800">Boost Your Server</h3>
                      <p className="text-muted-foreground text-sm transition-colors duration-800">Popular upgrades for better performance</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Extra RAM', price: '₹20', icon: '🚀' },
                      { name: 'Priority Support', price: '₹30', icon: '⚡' },
                    ].map((addon, idx) => (
                      <button
                        key={idx}
                        className="p-4 rounded-xl bg-foreground/5 border border-border hover:border-purple-500/30 hover:bg-purple-500/10 transition-all text-left group"
                      >
                        <div className="text-2xl mb-2">{addon.icon}</div>
                        <div className="text-foreground font-semibold text-sm mb-1 transition-colors duration-800">{addon.name}</div>
                        <div className="text-purple-600 dark:text-purple-400 font-bold transition-colors duration-800">{addon.price}/mo</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary - Right Column */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="sticky top-24 space-y-6"
                >
                  <div className="relative rounded-3xl border border-border bg-card backdrop-blur-xl overflow-hidden transition-colors duration-800">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                      }} />
                    </div>
                    
                    <div className="relative z-10 p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-foreground transition-colors duration-800">Order Summary</h3>
                        <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
                          <Lock className="w-4 h-4" />
                          <span className="text-xs font-medium">Secure</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6 pb-6 border-b border-border transition-colors duration-800">
                        <div className="flex justify-between text-foreground/80 transition-colors duration-800">
                          <span>Subtotal</span>
                          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                        </div>
                        
                        {appliedCoupon && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex justify-between items-center text-teal-600 dark:text-teal-400"
                          >
                            <div className="flex items-center gap-2">
                              <Gift className="w-4 h-4" />
                              <span>Discount ({appliedCoupon.discount}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                              <button
                                onClick={removeCoupon}
                                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-muted-foreground text-lg transition-colors duration-800">Total Due</span>
                        <div className="text-right">
                          <motion.div
                            key={total}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-4xl font-bold text-transparent bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text"
                          >
                            ₹{total.toFixed(2)}
                          </motion.div>
                          <p className="text-muted-foreground/40 text-sm mt-1 transition-colors duration-800">per month</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex gap-2 mb-3">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40 transition-colors duration-800" />
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                              onKeyPress={(e) => e.key === 'Enter' && applyCoupon(couponCode)}
                              placeholder="COUPON CODE"
                              disabled={!!appliedCoupon}
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-foreground/5 border border-border text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-teal-500/50 transition-all disabled:opacity-50"
                            />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => applyCoupon(couponCode)}
                            disabled={!couponCode || !!appliedCoupon}
                            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Apply
                          </motion.button>
                        </div>
                        
                        <button
                          onClick={() => setShowCouponList(!showCouponList)}
                          className="text-teal-600 dark:text-teal-400 text-sm hover:text-teal-500 dark:hover:text-teal-300 transition-colors flex items-center gap-1"
                        >
                          <Sparkles className="w-4 h-4" />
                          {showCouponList ? 'Hide' : 'Show'} available coupons
                        </button>
                        
                        <AnimatePresence>
                          {showCouponList && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 space-y-2"
                            >
                              {availableCoupons.map((coupon) => (
                                <button
                                  key={coupon.code}
                                  onClick={() => applyCoupon(coupon.code)}
                                  disabled={!!appliedCoupon}
                                  className="w-full p-3 rounded-lg bg-foreground/5 border border-border hover:border-teal-500/30 hover:bg-teal-500/10 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-teal-600 dark:text-teal-400 font-bold text-sm">{coupon.code}</span>
                                    <span className="text-teal-600 dark:text-teal-400 font-bold text-sm">{coupon.discount}% OFF</span>
                                  </div>
                                  <p className="text-muted-foreground text-xs transition-colors duration-800">{coupon.description}</p>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full group relative overflow-hidden rounded-xl py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold text-lg shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isProcessing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Zap className="w-5 h-5" />
                              Proceed to Checkout
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </motion.button>
                      
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          {[
                            { icon: '🔒', text: 'Secure Payment' },
                            { icon: '⚡', text: 'Instant Setup' },
                            { icon: '🎯', text: '24/7 Support' },
                          ].map((badge, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="text-2xl">{badge.icon}</div>
                              <p className="text-xs text-white/60 font-medium">{badge.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-white/40 text-xs mb-2">Powered by</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                          <Lock className="w-4 h-4 text-teal-400" />
                          <span className="text-white font-semibold">Paymenter</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Secure Checkout</h4>
                        <p className="text-white/60 text-sm leading-relaxed">
                          Your payment information is encrypted and processed securely through Paymenter.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
